from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.conf import settings

from treasurer.models import Transaction


class Account(models.Model):
    users = models.ManyToManyField(settings.AUTH_USER_MODEL)
    name = models.CharField(max_length=255, unique=True)
    total = models.FloatField(blank=True, default=0)
    limit = models.FloatField(blank=True, default=0)

    class Meta:
        app_label = 'treasurer'
        ordering = ['-id']

    def __str__(self):
        return '"{self.name}"'.format(self=self)


@receiver(pre_save, sender=Transaction)
def recalculate_total(**kwargs):
    diff = float(kwargs['instance'].total)
    if kwargs['instance'].id:
        diff -= Transaction.objects.get(id=kwargs['instance'].id).total

    acc = Account.objects.get(id=kwargs['instance'].account_id)
    acc.total = models.F('total') + diff
    acc.save()
