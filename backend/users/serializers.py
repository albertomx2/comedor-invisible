from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model  = User
        fields = ("id", "username", "email", "password")

    def create(self, validated_data):
        return User.objects.create_user(
            username = validated_data["username"],
            email    = validated_data["email"],
            password = validated_data["password"],
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model  = User
        fields = ("id", "username", "email", "rating_average")
