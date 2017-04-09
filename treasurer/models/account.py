from django.db import models
from django.db.models.signals import post_save, post_delete
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


def recalculate_total(account_id, diff):
    acc = Account.objects.get(id=account_id)
    acc.total = models.F('total') + diff
    acc.save()


@receiver(post_save, sender=Transaction)
def transaction_post_save(instance, created, **kwargs):
    diff = float(instance.total)
    if not created:
        diff -= Transaction.objects.get(id=instance.id).total

    recalculate_total(instance.account_id, diff)


@receiver(post_delete, sender=Transaction)
def transaction_post_delete(instance, **kwargs):
    recalculate_total(instance.account_id, -instance.total)
