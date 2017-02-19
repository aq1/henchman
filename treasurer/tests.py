import random

from django.test import TestCase

from rest_framework.test import APIRequestFactory

from authentication.models import User
from treasurer.models import Account, Transaction, Category

from treasurer.api import TransactionViewSet


class AnimalTestCase(TestCase):

    def setUp(self):
        self.total = {}
        acc = Account.objects.create(name='test')
        for category in Category.objects.filter(parent=None):
            c = category.get_descendants(include_self=True)
            totals = [random.randint(-200, 100) for _ in range(4)] + [100]
            self.total[category.id] = sum(filter(lambda i: i < 0, totals))
            for each in totals:
                Transaction.objects.create(account=acc,
                                           user_id=1,
                                           category=random.choice(c),
                                           total=each)

    def test_statistics(self):
        view = TransactionViewSet.as_view({'get': 'statistics'})
        request = APIRequestFactory().get('/treasurer/api/v1/transaction/statistics')
        request.user = User.objects.first()
        response = view(request)
        self.assertEqual(len(self.total), len(response.data))
        for each in response.data:
            self.assertEqual(self.total[each['id']], each['total'])
