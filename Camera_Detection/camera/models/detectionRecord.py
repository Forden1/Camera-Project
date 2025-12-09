from django.db import models
from .camera import Camera
from .customer import Customer
from .feature import Feature


class DetectionRecord(models.Model):
  STATUS_CHOICES = [
    ('pending', 'Pending Review'),
    ('confirmed', 'Confirmed'),
    ('false_positive', 'False Positive'),
    ('resolved', 'Resolved'),
  ]

  SEVERITY_CHOICES = [
    ('low', 'Low'),
    ('medium', 'Medium'),
    ('high', 'High'),
    ('critical', 'Critical'),
  ]

  camera = models.ForeignKey(
    Camera,
    on_delete=models.CASCADE,
    related_name="detection_records"
  )

  customer = models.ForeignKey(
    Customer,
    on_delete=models.CASCADE,
    related_name="detection_records"
  )

  feature = models.ForeignKey(
    Feature,
    on_delete=models.CASCADE,
    related_name="detection_records"
  )

  file_path = models.CharField(max_length=500)
  thumbnail_path = models.CharField(max_length=500, blank=True, null=True)

  file_type = models.CharField(
    max_length=10,
    choices=[
      ('image', 'Screenshot'),
      ('video', 'Video')
    ],
    default='image'
  )

  confidence_score = models.FloatField(
    null=True,
    blank=True,
    help_text="Model confidence score (0-1)"
  )

  detection_data = models.JSONField(
    blank=True,
    null=True,
    help_text="Additional detection data (bounding boxes, coordinates, etc.)"
  )

  status = models.CharField(
    max_length=20,
    choices=STATUS_CHOICES,
    default='pending'
  )

  severity = models.CharField(
    max_length=10,
    choices=SEVERITY_CHOICES,
    default='medium'
  )

  detected_at = models.DateTimeField(
    help_text="When the detection occurred (from camera timestamp)"
  )
  created_at = models.DateTimeField(
    auto_now_add=True,
    help_text="When the record was saved to database"
  )

  viewed = models.BooleanField(default=False)
  viewed_at = models.DateTimeField(null=True, blank=True)

  notes = models.TextField(blank=True, help_text="Admin/user notes")

  class Meta:
    db_table = 'detectionRecord'  # ADD THIS
    ordering = ['-detected_at']
    indexes = [
      models.Index(fields=['camera', '-detected_at']),
      models.Index(fields=['customer', '-detected_at']),
      models.Index(fields=['feature', '-detected_at']),
      models.Index(fields=['status', '-detected_at']),
      models.Index(fields=['viewed', '-detected_at']),
    ]

  def __str__(self):
    return f"{self.feature.get_code_display()} - {self.camera.name} @ {self.detected_at}"

  def mark_as_viewed(self):
    from django.utils import timezone
    if not self.viewed:
      self.viewed = True
      self.viewed_at = timezone.now()
      self.save(update_fields=['viewed', 'viewed_at'])

  @property
  def is_recent(self):
    from django.utils import timezone
    from datetime import timedelta
    return self.detected_at > timezone.now() - timedelta(days=1)
