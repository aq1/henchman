from rest_framework import serializers
from treasurer.models import Transaction


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = 'id', 'account', 'category', 'total', 'comment'

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        if not self.request.user.id:
            return Transaction.objects.none()
        return self.request.user.transactions.all()
