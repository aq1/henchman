import datetime

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

    @list_route()
    def last(self, request):
        transactions = Transaction.objects.filter(account__users=request.user.id)
        page = self.paginate_queryset(transactions)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(transactions, many=True)
        return Response(serializer.data)

    @list_route(methods=['get'])
    def statistics(self, request):
        month = request.GET.get('month', datetime.datetime.now().month)
        parent_id = request.GET.get('id')

        if parent_id:
            statistics = Category.objects.get(id=parent_id).get_children()
        else:
            statistics = Category.objects.filter(level=0)

        statistics = (statistics.filter(transactions__date__month=month)
                                .annotate(total=models.Sum('transactions__total'))
                                .values('id', 'name', 'total'))
        return Response(statistics)
