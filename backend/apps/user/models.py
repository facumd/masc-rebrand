from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

# Create your models here.


class User(AbstractUser):
    class Permissions(models.IntegerChoices):
        ADMIN = 1
        CUSTOMER = 2

    first_name = models.CharField(_("Name"), max_length=150, blank=False)
    last_name = models.CharField(_("Last Name"), max_length=150, blank=False)
    username = models.CharField(_("Username"), max_length=150, blank=False, unique=True)
    email = models.EmailField(_("Email"), blank=False, unique=True)
    permissions = models.IntegerField(
        choices=Permissions.choices, default=Permissions.ADMIN, blank=False
    )

    class Meta:
        db_table = "auth_user"
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return self.first_name
