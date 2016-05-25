from django.contrib.auth.models import User

from rest_framework import serializers

from treasurer.models import Account


class UserSerializer(serializers.ModelSerializer):

    accounts = serializers.PrimaryKeyRelatedField(many=True, queryset=Account.objects.all())

    class Meta:
        model = User
        fields = 'id', 'username', 'accounts'
