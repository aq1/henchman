from django.db import models

from mptt.models import MPTTModel, TreeForeignKey


class Category(MPTTModel):

    name = models.CharField(max_length=255)
    parent = TreeForeignKey('self',
                            null=True,
                            blank=True,
                            related_name='children',
                            db_index=True)

    class Meta:
        app_label = 'treasurer'
        unique_together = ['name', 'parent']

    def __str__(self):
        return self.name
