# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-06-27 10:18
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('treasurer', '0004_auto_20170409_0050'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='destination_account',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transfers', to='treasurer.Account'),
        ),
    ]