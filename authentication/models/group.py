from django.db import models


class Group(models.Model):

    name = models.CharField(max_length=255)

    class Meta:
        app_label = 'authentication'

    def __str__(self):
        return self.name
