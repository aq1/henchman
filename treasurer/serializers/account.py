from rest_framework import serializers
from treasurer.models import Account


class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = 'id', 'user', 'name', 'total', 'limit'
