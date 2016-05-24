from rest_framework import viewsets
from rest_framework import permissions

from treasurer.models import Account
from treasurer.serializers import AccountSerializer
from treasurer.permissions import IsOwnerOrReadOnly


class AccountViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
