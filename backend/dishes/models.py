from django.conf import settings
from django.db import models

class Dish(models.Model):
    name         = models.CharField(max_length=120)
    description  = models.TextField(blank=True)
    lat          = models.DecimalField(max_digits=8, decimal_places=5)
    lng          = models.DecimalField(max_digits=8, decimal_places=5)

    # quien lo creó
    creator      = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="dishes",
        on_delete=models.CASCADE,
    )
    created_at   = models.DateTimeField(auto_now_add=True)

    # nueva lógica de reserva
    is_taken     = models.BooleanField(default=False)
    reserved_by  = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="reservations",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    reserved_at  = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name
