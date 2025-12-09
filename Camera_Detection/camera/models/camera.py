from django.db import models
from .customer import Customer


class Camera(models.Model):
    customer = models.ForeignKey(
        Customer,
        on_delete=models.CASCADE,
        related_name="cameras"
    )

    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255, blank=True)
    locked = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'camera'  # ADD THIS

    def __str__(self):
        return f"{self.name} ({self.customer.username})"
