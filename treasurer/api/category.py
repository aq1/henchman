from rest_framework import permissions

from treasurer.api import BaseModelViewSet
from treasurer.models import Category
from treasurer.serializers import CategorySerializer


class CategoryViewSet(BaseModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.all()
