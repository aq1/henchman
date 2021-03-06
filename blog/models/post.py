from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

import bleach
import markdown
import requests


class Post(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)

    title = models.CharField(max_length=255)
    body = models.TextField()
    rendered_body = models.TextField(default='', blank=True)

    class Meta:
        ordering = ['-created']

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        self.rendered_body = markdown.markdown(bleach.clean(self.body))
        return super().save(force_insert, force_update, using, update_fields)

    def __str__(self):
        return '{}'.format(self.title)


@receiver(post_save, sender=Post)
def send_notification_in_vk_chat(instance, created, **kwargs):
    if not created:
        return
    try:
        requests.post(
            'https://api.vk.com/method/messages.send',
            data={
                'chat_id': settings.VK_CHAT_ID,
                'message': '{} добавил новую запись в блог!'.format(instance.user),
            },
            params={
                'access_token': settings.VK_TOKEN,
            }
        )
    except requests.RequestException:
        pass
