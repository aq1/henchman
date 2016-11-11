from rest_framework import permissions

from treasurer.api import BaseModelViewSet
from treasurer.models import Check
from treasurer.serializers import CheckSerializer


class CheckViewSet(BaseModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Check.objects.all()
    serializer_class = CheckSerializer
    permission_classes = [permissions.IsAuthenticated]
