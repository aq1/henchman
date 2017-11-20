from django.db import models
from django.conf import settings

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
