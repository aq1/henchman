# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-20 12:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_auto_20171120_0242'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='spiritual_coloring',
            field=models.CharField(blank=True, choices=[('e24e42', 'Papaya'), ('e8b000', 'Mustard'), ('eb6e80', 'Blush'), ('008f95', 'Aqua')], default='e24e42', max_length=6),
        ),
    ]
