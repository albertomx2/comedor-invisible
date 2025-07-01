from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    """Usuario extendido con media de valoraciones."""
    rating_average = models.DecimalField(max_digits=3, decimal_places=2, default=0)

    def __str__(self):
        return self.username
