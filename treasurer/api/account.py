from rest_framework import viewsets
from rest_framework import permissions

from treasurer.models import Account
from treasurer.serializers import AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    serializer_class = AccountSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Account.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.request.user.accounts.all()
