from django.db import models
from django.conf import settings


class Transaction(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='transactions')
    account = models.ForeignKey('treasurer.Account', related_name='transactions')
    category = models.ForeignKey('treasurer.Category', related_name='transactions')

    date = models.DateTimeField(blank=True, auto_now_add=True)
    total = models.FloatField()
    comment = models.TextField(blank=True, default='')

    class Meta:
        app_label = 'treasurer'
        ordering = ['-date']

    def __str__(self):
        return '{self.account}: transaction by {self.user}'.format(self=self)
