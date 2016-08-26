from rest_framework import serializers
from treasurer.models import Transaction


class TransactionSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(source='category.name', read_only=True)
    account_name = serializers.CharField(source='account.name', read_only=True)

    class Meta:
        model = Transaction
        fields = 'id', 'account', 'category', 'date', 'total', 'comment', 'category_name', 'account_name'
