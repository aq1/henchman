from django.db import models


class Transaction(models.Model):

    account = models.ForeignKey('treasurer.Account', related_name='transactions')
    category = models.ForeignKey('treasurer.Category', related_name='transactions')
    total = models.FloatField()

    class Meta:
        app_label = 'treasurer'

    def __str__(self):
        return 'Transaction for {self.account}'.format(self=self)
