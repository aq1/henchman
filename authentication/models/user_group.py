from django.db import models


class UserGroup(models.Model):

    user = models.ForeignKey('authentication.User')
    group = models.ForeignKey('authentication.Group')

    class Meta:
        app_label = 'authentication'

    def __str__(self):
        return '{} {}'.format(self.group, self.user)
