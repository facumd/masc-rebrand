from django.urls import path, include
from django.conf import settings
from django.core.files.storage import default_storage
from rest_framework import viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import status
from .models import User
from .serializers import UserSerializer
from .views import LoginView, LogoutView, SignupView


class UsuarioViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer


urlpatterns = [
    path("auth/login/", LoginView.as_view(), name="auth_login"),
    path("auth/logout/", LogoutView.as_view(), name="auth_logout"),
    path("auth/signup/", SignupView.as_view(), name="auth_signup"),
]
