import os
import json

from django.db import models
from django.conf import settings

from django.db.models.signals import post_save
from django.dispatch import receiver

from mptt.models import MPTTModel, TreeForeignKey


class Category(MPTTModel):

    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             related_name='categories',
                             null=True)
    name = models.CharField(max_length=255)
    parent = TreeForeignKey('self',
                            null=True,
                            blank=True,
                            related_name='children',
                            db_index=True)

    class Meta:
        app_label = 'treasurer'
        unique_together = ['user', 'name', 'parent']

    @classmethod
    def create_default_for_user(cls, user):
        """
        If someday somehow this app will be used more than
        just two person in the world, this should be re-done as a celery task.
        """
        fixture = os.path.join(settings.BASE_DIR, 'treasurer', 'fixtures', 'category.json')
        with open(fixture, 'rb') as f:
            categories = json.loads(f.read().decode('utf8'))
        max_id = Category.objects.order_by('-id').first().id
        for each in categories:
            parent_id = None
            id_ = max_id + each['pk']
            if each['fields']['parent']:
                parent_id = max_id + each['fields']['parent']

            Category.objects.create(id=id_,
                                    user=user,
                                    parent_id=parent_id,
                                    name=each['fields']['name'])

    def __str__(self):
        return str(self.name)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def user_post_save(instance, created, **kwargs):
    if created:
        Category.create_default_for_user(instance)
