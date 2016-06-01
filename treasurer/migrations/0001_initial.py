# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings
import mptt.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('total', models.FloatField(default=0, blank=True)),
                ('limit', models.FloatField(default=0, blank=True)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL, related_name='accounts')),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('lft', models.PositiveIntegerField(db_index=True, editable=False)),
                ('rght', models.PositiveIntegerField(db_index=True, editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(db_index=True, editable=False)),
                ('parent', mptt.fields.TreeForeignKey(to='treasurer.Category', null=True, related_name='children', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Check',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='check/%Y/%m/%d/')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, auto_created=True, verbose_name='ID')),
                ('total', models.FloatField()),
                ('account', models.ForeignKey(to='treasurer.Account', related_name='transactions')),
                ('category', models.ForeignKey(to='treasurer.Category', related_name='transactions')),
            ],
        ),
        migrations.AddField(
            model_name='check',
            name='transaction',
            field=models.ForeignKey(to='treasurer.Transaction'),
        ),
    ]
