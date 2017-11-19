from django.contrib import auth
from django.contrib.auth.models import (
    UserManager,
    AbstractBaseUser,
    PermissionsMixin
)
from django.db import models


class HenchmanUserManager(UserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(email=self.normalize_email(email))

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password=password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    MALE = False
    FEMALE = True
    SEX = (
        (MALE, 'Male'),
        (FEMALE, 'Female')
    )

    email = models.EmailField(unique=True)

    avatar = models.ImageField(upload_to='avatars', blank=True, null=True)

    first_name = models.CharField(max_length=255, blank=True, default='')
    last_name = models.CharField(max_length=255, blank=True, default='')

    sex = models.NullBooleanField(blank=True, null=True, choices=SEX)
    birthday = models.DateField(blank=True, null=True)

    is_admin = models.BooleanField(blank=True, default=False)
    is_staff = models.BooleanField(blank=True, default=False)
    is_active = models.BooleanField(blank=True, default=True)

    date_joined = models.DateField(blank=True, auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = HenchmanUserManager()

    class Meta:
        app_label = 'authentication'

    @classmethod
    def login(cls, request, username, password):
        user = auth.authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                auth.login(request, user)
                return True, user
            else:
                return False, 'This user has been disabled.'
        else:
            return False, 'Username/password combination invalid.'

    def get_full_name(self):
        return '{} {}'.format(self.last_name,
                              self.first_name)

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.get_full_name().strip() or self.email
