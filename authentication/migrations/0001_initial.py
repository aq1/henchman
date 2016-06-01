# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import authentication.models.user


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(verbose_name='last login', blank=True, null=True)),
                ('is_superuser', models.BooleanField(default=False, verbose_name='superuser status', help_text='Designates that this user has all permissions without explicitly assigning them.')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('first_name', models.CharField(max_length=255, blank=True, null=True)),
                ('last_name', models.CharField(max_length=255, blank=True, null=True)),
                ('sex', models.NullBooleanField(choices=[(False, 'Male'), (True, 'Female')])),
                ('birthday', models.DateField(blank=True, null=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('date_joined', models.DateField(auto_now_add=True)),
                ('groups', models.ManyToManyField(related_query_name='user', help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', to='auth.Group', blank=True, verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(related_query_name='user', help_text='Specific permissions for this user.', related_name='user_set', to='auth.Permission', blank=True, verbose_name='user permissions')),
            ],
            managers=[
                ('objects', authentication.models.user.HenchmanUserManager()),
            ],
        ),
    ]
