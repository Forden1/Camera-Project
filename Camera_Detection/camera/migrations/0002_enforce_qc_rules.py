from django.db import migrations


class Migration(migrations.Migration):
  dependencies = [
    ('camera', '0001_initial'),
  ]

  operations = [
    migrations.RunSQL(
      sql="""
            -- =============================================================================
            -- TRIGGER 1: Enforce QC Lock on CameraFeatures
            -- =============================================================================
            CREATE OR REPLACE FUNCTION enforce_qc_lock()
            RETURNS trigger AS $$
            DECLARE
                is_qc_feature BOOLEAN;
                camera_locked BOOLEAN;
                has_other_features BOOLEAN;
            BEGIN
                -- Skip checks if disabling a feature or deleting
                IF (TG_OP = 'DELETE') THEN
                    RETURN OLD;
                END IF;

                IF (TG_OP = 'UPDATE' AND NEW.is_enabled = FALSE) THEN
                    RETURN NEW;
                END IF;

                -- Only enforce when feature is being enabled
                IF NEW.is_enabled = TRUE THEN
                    -- Check if this is the QC feature
                    SELECT (code = 'QC') INTO is_qc_feature
                    FROM feature
                    WHERE id = NEW.feature_id;

                    IF is_qc_feature THEN
                        -- Check if camera has other enabled features
                        SELECT EXISTS(
                            SELECT 1 FROM "cameraFeature"
                            WHERE camera_id = NEW.camera_id
                            AND feature_id != NEW.feature_id
                            AND is_enabled = TRUE
                        ) INTO has_other_features;

                        IF has_other_features THEN
                            RAISE EXCEPTION 'Cannot enable Quality Control: Camera already has other enabled features';
                        END IF;

                        -- Lock the camera
                        UPDATE camera
                        SET locked = TRUE
                        WHERE id = NEW.camera_id;
                    ELSE
                        -- This is NOT QC feature, check if camera is locked
                        SELECT locked INTO camera_locked
                        FROM camera
                        WHERE id = NEW.camera_id;

                        IF camera_locked THEN
                            RAISE EXCEPTION 'Cannot enable feature: Camera is locked to Quality Control';
                        END IF;
                    END IF;
                END IF;

                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER qc_lock_trigger
            BEFORE INSERT OR UPDATE ON "cameraFeature"
            FOR EACH ROW
            EXECUTE FUNCTION enforce_qc_lock();


            -- =============================================================================
            -- TRIGGER 2: Auto-unlock camera when QC is disabled/deleted
            -- =============================================================================
            CREATE OR REPLACE FUNCTION unlock_camera_on_qc_removal()
            RETURNS trigger AS $$
            DECLARE
                is_qc_feature BOOLEAN;
                camera_id_to_unlock INTEGER;
            BEGIN
                -- Determine camera_id and whether this is QC
                IF (TG_OP = 'DELETE') THEN
                    camera_id_to_unlock := OLD.camera_id;
                    SELECT (code = 'QC') INTO is_qc_feature
                    FROM feature
                    WHERE id = OLD.feature_id;
                ELSE
                    -- UPDATE case where is_enabled changes from TRUE to FALSE
                    IF (OLD.is_enabled = TRUE AND NEW.is_enabled = FALSE) THEN
                        camera_id_to_unlock := NEW.camera_id;
                        SELECT (code = 'QC') INTO is_qc_feature
                        FROM feature
                        WHERE id = NEW.feature_id;
                    ELSE
                        -- Not a relevant update
                        RETURN NEW;
                    END IF;
                END IF;

                -- If QC was removed/disabled, unlock the camera
                IF is_qc_feature THEN
                    UPDATE camera
                    SET locked = FALSE
                    WHERE id = camera_id_to_unlock;
                END IF;

                IF (TG_OP = 'DELETE') THEN
                    RETURN OLD;
                ELSE
                    RETURN NEW;
                END IF;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER unlock_camera_trigger
            AFTER UPDATE OR DELETE ON "cameraFeature"
            FOR EACH ROW
            EXECUTE FUNCTION unlock_camera_on_qc_removal();


            -- =============================================================================
            -- TRIGGER 3: Prevent direct camera lock manipulation
            -- =============================================================================
            CREATE OR REPLACE FUNCTION prevent_manual_lock_change()
            RETURNS trigger AS $$
            DECLARE
                has_qc_enabled BOOLEAN;
            BEGIN
                -- On INSERT, locked should always be FALSE
                IF (TG_OP = 'INSERT') THEN
                    NEW.locked := FALSE;
                    RETURN NEW;
                END IF;

                -- On UPDATE, check if locked status is being changed
                IF (TG_OP = 'UPDATE' AND OLD.locked != NEW.locked) THEN
                    -- Check if camera has QC enabled
                    SELECT EXISTS(
                        SELECT 1 FROM "cameraFeature" cf
                        JOIN feature f ON cf.feature_id = f.id
                        WHERE cf.camera_id = NEW.id
                        AND f.code = 'QC'
                        AND cf.is_enabled = TRUE
                    ) INTO has_qc_enabled;

                    -- Enforce correct lock state
                    IF has_qc_enabled THEN
                        NEW.locked := TRUE;
                    ELSE
                        NEW.locked := FALSE;
                    END IF;
                END IF;

                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER prevent_manual_lock_trigger
            BEFORE INSERT OR UPDATE ON camera
            FOR EACH ROW
            EXECUTE FUNCTION prevent_manual_lock_change();
            """,

      reverse_sql="""
                DROP TRIGGER IF EXISTS prevent_manual_lock_trigger ON camera;
                DROP FUNCTION IF EXISTS prevent_manual_lock_change();
                DROP TRIGGER IF EXISTS unlock_camera_trigger ON "cameraFeature";
                DROP FUNCTION IF EXISTS unlock_camera_on_qc_removal();
                DROP TRIGGER IF EXISTS qc_lock_trigger ON "cameraFeature";
                DROP FUNCTION IF EXISTS enforce_qc_lock();
            """
    ),
  ]
