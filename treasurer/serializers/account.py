from rest_framework import serializers

from authentication.serializers import UserSerializer

from treasurer.models import Account


class AccountSerializer(serializers.ModelSerializer):

    users = UserSerializer(read_only=True, many=True)

    class Meta:
        model = Account
        fields = 'id', 'users', 'name', 'total', 'limit'
