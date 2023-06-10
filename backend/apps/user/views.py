from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, status
from rest_framework.serializers import ValidationError
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import (
    OutstandingToken,
    BlacklistedToken,
)
from rest_framework.permissions import AllowAny
from datetime import timedelta
from django.http import JsonResponse
from .serializers import UserSerializer, SignupSerializer
from .models import User

# Create your views here.


def create_response(
    message: str, data: any = None, status_code: status = status.HTTP_200_OK
):
    return JsonResponse(
        {"mssg": message, "data": data, "status": status_code},
        status=status_code,
        safe=False,
    )


class SignupView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    queryset = User.objects.all()
    serializer_class = SignupSerializer

    def create(self, request: Request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                self.perform_create(serializer)
                return create_response(
                    "Usuario Registrado Correctamente",
                    serializer.data,
                    status.HTTP_201_CREATED,
                )
            except ValidationError as ex:
                return create_response(
                    str(ex.detail[0]), status_code=status.HTTP_400_BAD_REQUEST
                )

        return create_response(
            "Error registrando usuario", serializer.errors, status.HTTP_400_BAD_REQUEST
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user:
            token = RefreshToken.for_user(user)
            access_token = token.access_token
            access_token.set_exp(lifetime=timedelta(days=1))
            login(request, user)

            serializer = UserSerializer(user)
            response = create_response(
                "Inicio de sesión exitoso",
                {
                    "usuarioActual": serializer.data,
                    "accessToken": {
                        "acceso": str(access_token),
                        "refresco": str(token),
                    },
                },
                status.HTTP_200_OK,
            )
            response.set_cookie("accessToken", token, httponly=True)
            return response

        return create_response(
            "Error iniciando sesión", status_code=status.HTTP_404_NOT_FOUND
        )


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request):
        logout(request)
        token: OutstandingToken
        for token in OutstandingToken.objects.filter(user=request.user.id):
            _, _ = BlacklistedToken.objects.get_or_create(token=token)

        return create_response(
            "Sesión terminada con éxito", status_code=status.HTTP_200_OK
        )
