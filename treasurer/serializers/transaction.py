from rest_framework import serializers
from treasurer.models import Transaction


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = 'id', 'account', 'category', 'total', 'comment'
