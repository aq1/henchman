from rest_framework import serializers
from treasurer.models import Account, Transaction


class AccountSerializer(serializers.ModelSerializer):

    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Account
        fields = 'id', 'user', 'name', 'total', 'limit'
