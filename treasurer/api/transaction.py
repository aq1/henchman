import calendar
from django.db import models
from django.utils import timezone

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

    def _get_stats(self, user, categories, date_range=None):
        statistics = []

        for category in categories:
            total = (Transaction.objects.filter(category_id__in=category.get_descendants(include_self=True)
                                                                        .values_list('id', flat=True),
                                                total__lt=0,
                                                user=user))
            if date_range:
                total = total.filter(date__gte=date_range[0],
                                     date__lte=date_range[1])

            total = total.aggregate(t=models.Sum('total'))['t']
            if not total:
                continue
            statistics.append({'id': category.id, 'name': category.name, 'total': total})

        return statistics

    @list_route(methods=['get'])
    def statistics(self, request):
        parent_id = request.GET.get('id')

        if parent_id and not Category.objects.filter(id=parent_id, user=request.user).exists():
            return Response(status=403)

        date_range = None
        if request.GET.get('from') and request.GET.get('to'):
            date_range = request.GET['from'], request.GET['to']

        if parent_id:
            categories = Category.objects.filter(parent_id=parent_id, user=request.user)
        else:
            categories = Category.objects.filter(level=0, user=request.user)

        return Response(self._get_stats(request.user, categories, date_range))

    @list_route(methods=['get'])
    def monthstats(self, request):
        categories = Category.objects.filter(level=0, user=request.user)
        year, month = int(request.GET.get('year')), int(request.GET.get('month'))
        date_from = timezone.datetime(year, month, 1)
        date_to = (date_from + timezone.timedelta(days=calendar.monthrange(year, month)[1]))
        return Response(self._get_stats(request.user, categories, (date_from, date_to)))
