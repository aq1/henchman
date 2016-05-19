from django.db import models


class Transaction(models.Model):

    account = models.ForeignKey('treasurer.Account')
    category = models.ForeignKey('treasurer.Category')
    total = models.FloatField()

    class Meta:
        app_label = 'treasurer'
