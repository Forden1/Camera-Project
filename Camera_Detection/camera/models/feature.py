from django.db import models


class Feature(models.Model):
    class FeatureType(models.TextChoices):
        QUALITY_CONTROL = "QC", "Quality Control"
        FALL_DETECTION = "FD", "Fall Detection"
        BRAWL_DETECTION = "BD", "Brawl Detection"

    code = models.CharField(
        max_length=2,
        choices=FeatureType.choices,
        unique=True
    )

    description = models.TextField(blank=True)

    class Meta:
        db_table = 'feature'  # ADD THIS

    def __str__(self):
        return self.get_code_display()
