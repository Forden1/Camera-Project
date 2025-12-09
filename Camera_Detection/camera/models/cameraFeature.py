from django.db import models
from .camera import Camera
from .feature import Feature


class CameraFeatures(models.Model):
    camera = models.ForeignKey(
        Camera,
        on_delete=models.CASCADE,
        related_name="features"
    )

    feature = models.ForeignKey(
        Feature,
        on_delete=models.CASCADE
    )

    is_enabled = models.BooleanField(default=True)
    config = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'cameraFeature'  # ADD THIS
        unique_together = ("camera", "feature")

    def __str__(self):
        return f"{self.camera} → {self.feature}"
