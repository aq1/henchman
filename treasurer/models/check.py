from django.db import models


class Check(models.Model):

    transaction = models.ForeignKey('treasurer.Transaction')
    photo = models.ImageField(upload_to='check/%Y/%m/%d/')

    class Meta:
        app_label = 'treasurer'
