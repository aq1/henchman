from django.db import models

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import list_route

from treasurer.api import BaseModelViewSet
from treasurer.models import Transaction, Category
from treasurer.serializers import TransactionSerializer


class TransactionViewSet(BaseModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return self.request.user.transactions.all()

    @list_route(methods=['get'])
    def statistics(self, request):
        parent_id = request.GET.get('id')

        if parent_id and not Category.objects.filter(id=parent_id, user=request.user).exists():
            return Response(status=403)

        date_range = None
        if request.GET.get('from') and request.GET.get('to'):
            date_range = request.GET['from'], request.GET['to']

        if parent_id:
            root_categories = Category.objects.filter(parent_id=parent_id, user=request.user)
        else:
            root_categories = Category.objects.filter(level=0, user=request.user)

        statistics = []

        for category in root_categories:
            total = (Transaction.objects.filter(category_id__in=category.get_descendants(include_self=True)
                                                                        .values_list('id', flat=True),
                                                total__lt=0,
                                                user=request.user))
            if date_range:
                total = total.filter(date__gte=date_range[0],
                                     date__lte=date_range[1])

            total = total.aggregate(t=models.Sum('total'))['t']
            if not total:
                continue
            statistics.append({'id': category.id, 'name': category.name, 'total': total})

        return Response(statistics)
