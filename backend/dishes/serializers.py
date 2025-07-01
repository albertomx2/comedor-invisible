from rest_framework import serializers
from .models import Dish

class DishSerializer(serializers.ModelSerializer):
    creator     = serializers.ReadOnlyField(source="creator.username")
    reserved_by = serializers.ReadOnlyField(source="reserved_by.username")

    class Meta:
        model  = Dish
        fields = (
            "id", "name", "description",
            "lat", "lng",
            "creator", "created_at",
            "is_taken", "reserved_by", "reserved_at",
        )
        read_only_fields = (
            "id", "creator", "created_at",
            "is_taken", "reserved_by", "reserved_at",
        )
