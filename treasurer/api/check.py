from rest_framework import viewsets
from rest_framework import permissions

from treasurer.models import Check
from treasurer.serializers import CheckSerializer


class CheckViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Check.objects.all()
    serializer_class = CheckSerializer
    permission_classes = [permissions.IsAuthenticated]
