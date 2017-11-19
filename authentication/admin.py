from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import *


class HenchmanUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = 'email', 'password'

    def is_valid(self):
        return super().is_valid()

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user


class HenchmanUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User
        fields = ('email', 'last_name', 'first_name', 'is_staff', 'is_admin', 'is_superuser', 'birthday', 'sex')


@admin.register(User)
class HenchmanUserAdmin(UserAdmin):
    form = HenchmanUserChangeForm
    add_form = HenchmanUserCreationForm

    list_display = ['email', 'get_full_name', 'is_staff']
    search_fields = ['email', 'last_name', 'first_name']
    ordering = ['id']
    filter_horizontal = ()
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {
            'fields': ('avatar', 'first_name', 'last_name', 'birthday', 'sex')}),
        ('Administration', {
            'fields': ('is_admin', 'is_staff', 'is_superuser')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}),
    )
