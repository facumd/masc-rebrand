from rest_framework import serializers
from collections import OrderedDict
from .models import User


def remove_password_from_reponse(representation: OrderedDict):
    representation.pop("password")
    return representation


class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, source="username")
    password = serializers.CharField(min_length=6, required=True, source="password")
    first_name = serializers.CharField(required=True, source="first_name")
    last_name = serializers.CharField(required=True, source="last_name")

    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "permissions",
            "first_name",
            "last_name",
            "email",
        ]

    def to_representation(self, instance):
        return remove_password_from_reponse(super().to_representation(instance))


class SignupSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True, source="first_name")
    last_name = serializers.CharField(required=True, source="last_name")
    username = serializers.CharField(required=True, source="username")
    password = serializers.CharField(required=True, source="password")
    email = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = [
            "name",
            "last_name",
            "username",
            "password",
            "email",
        ]

    def create(self, validated_data):
        self._validate_username_not_exists(validated_data["username"])

        user = User(
            username=validated_data["username"],
            password=validated_data["password"],
            permissions=validated_data["permissions"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            email=validated_data["email"],
        )

        user.set_password(validated_data["password"])
        user.save()
        return user

    def to_representation(self, instance):
        return remove_password_from_reponse(super().to_representation(instance))

    def _validate_username_not_exists(self, username):
        username = Usuario.objects.filter(username=username)
        if username:
            raise serializers.ValidationError("El nombre de usuario ya existe")
