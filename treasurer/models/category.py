from django.db import models


class Category(models.Model):

    name = models.CharField(max_length=255)

    class Meta:
        app_label = 'treasurer'

    def __str__(self):
        return self.name
