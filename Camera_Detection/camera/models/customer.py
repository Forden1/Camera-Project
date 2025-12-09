from django.contrib.auth.models import AbstractUser
from django.db import models


class Customer(AbstractUser):
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'customer'  # ADD THIS

    def __str__(self):
        return self.username
