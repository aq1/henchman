from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver

import requests


from blog.models import Post


class Comment(models.Model):

    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    post = models.ForeignKey(Post)

    body = models.TextField()

    created = models.DateTimeField(auto_now_add=True)
    edited = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return 'Comment by {user} to {post}'.format(
            user=self.user,
            post=self.post,
        )


@receiver(post_save, sender=Comment)
def send_notification_in_vk_chat(instance, created, **kwargs):
    if not created:
        return
    try:
        requests.post(
            'https://api.vk.com/method/messages.send',
            data={
                'chat_id': settings.VK_CHAT_ID,
                'message': '{} добавил новый комментарий к посту "{}"!'.format(
                    instance.user,
                    instance.post.title,
                ),
            },
            params={
                'access_token': settings.VK_TOKEN,
            }
        )
    except requests.RequestException:
        pass
