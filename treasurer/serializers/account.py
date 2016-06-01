from rest_framework import serializers
from treasurer.models import Account, Transaction


class AccountSerializer(serializers.ModelSerializer):

    user = serializers.ReadOnlyField(source='user.first_name')
    transactions = serializers.PrimaryKeyRelatedField(many=True, queryset=Transaction.objects.all())

    class Meta:
        model = Account
        fields = 'id', 'user', 'name', 'total', 'limit', 'transactions'
