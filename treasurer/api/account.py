from django.http import HttpResponse
from django.db import IntegrityError

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import detail_route
from rest_framework.response import Response

from authentication.models import User

from treasurer.models import Account, Transaction
from treasurer.serializers import AccountSerializer, TransactionSerializer


class AccountViewSet(ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.
    """
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]
    queryset = Account.objects.all()

    def perform_create(self, serializer):
        obj = serializer.save()
        obj.users.add(self.request.user)

    def get_queryset(self):
        return Account.objects.filter(users=self.request.user)

    @detail_route()
    def transactions(self, request, pk=None):
        transactions = Transaction.objects.filter(account_id=pk, account__users=request.user)
        page = self.paginate_queryset(transactions)
        if page is not None:
            serializer = TransactionSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    @detail_route(methods=['post'])
    def add_user(self, request, pk=None):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Need email parameter'}, 400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'No user found'}, 400)

        try:
            Account.users.through.objects.create(user=user, account_id=pk)
        except IntegrityError:
            return Response({'error': 'User already connected to this account'}, 400)
        return HttpResponse()
