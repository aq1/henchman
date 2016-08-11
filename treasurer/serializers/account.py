from rest_framework import serializers
from treasurer.models import Account, Transaction


class AccountSerializer(serializers.ModelSerializer):

    # transactions = serializers.PrimaryKeyRelatedField(many=True, queryset=Transaction.objects.all())
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Account
        fields = 'id', 'user', 'name', 'total', 'limit'#, 'transactions'
