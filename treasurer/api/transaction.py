from rest_framework import viewsets
from rest_framework import permissions

from treasurer.models import Transaction
from treasurer.serializers import TransactionSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
