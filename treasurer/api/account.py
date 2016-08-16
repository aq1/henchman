from rest_framework import viewsets
from rest_framework import permissions
from rest_framework import decorators
from rest_framework.response import Response

from treasurer.models import Account, Transaction
from treasurer.serializers import AccountSerializer, TransactionSerializer


class AccountViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.request.user.accounts.all()

    @decorators.detail_route(methods=['get'])
    def transactions(self, request, pk=None):
        transactions = Transaction.objects.filter(account_id=pk)
        page = self.paginate_queryset(transactions)
        if page is not None:
            serializer = TransactionSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
