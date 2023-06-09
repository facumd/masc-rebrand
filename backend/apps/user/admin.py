from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import UserChangeForm
from .models import User

# Register your models here.


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "password",
                )
            },
        ),
        (_("Personal info"), {"fields": ("first_name", "last_name")}),
        (
            _("Users"),
            {"fields": ("permissons",)},
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "permissions",
                ),
            },
        ),
    )
    list_display = ["first_name", "last_name", "email"]
    search_fields = ("email", "first_name", "last_name")
    ordering = ("first_name",)


admin.site.register(User, UserAdmin)
