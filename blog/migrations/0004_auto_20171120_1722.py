# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-20 14:22
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20171120_1607'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='comment',
            options={'ordering': ['id']},
        ),
    ]
