from django.contrib import admin
from .models import Dish

@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = ("name", "creator", "is_taken", "created_at")
    list_filter  = ("is_taken",)
    search_fields = ("name", "creator__username")
