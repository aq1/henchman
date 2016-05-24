from rest_framework import serializers
from treasurer.models import Account


class AccountSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Account
        fields = 'id', 'user', 'name', 'total', 'limit'
