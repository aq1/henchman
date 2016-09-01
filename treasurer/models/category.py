from django.db import models
from django.conf import settings

from mptt.models import MPTTModel, TreeForeignKey


class Category(MPTTModel):

    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='categories')
    name = models.CharField(max_length=255)
    parent = TreeForeignKey('self',
                            null=True,
                            blank=True,
                            related_name='children',
                            db_index=True)

    class Meta:
        app_label = 'treasurer'
        unique_together = ['user', 'name', 'parent']

    def __str__(self):
        return self.name
