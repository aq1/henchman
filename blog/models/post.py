from django.db import models
from django.conf import settings

import bleach
import markdown


class Post(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)

    title = models.CharField(max_length=255)
    body = models.TextField()
    rendered_body = models.TextField(default='')

    class Meta:
        ordering = ['-created']

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.rendered_body = markdown.markdown(bleach.clean(self.body))
        return super().save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return '{}'.format(self.title)
