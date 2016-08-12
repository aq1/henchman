from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from treasurer import api
from treasurer import views

router = DefaultRouter(trailing_slash=False)
router.register(r'accounts', api.AccountViewSet)
router.register(r'transactions', api.TransactionViewSet)
router.register(r'categories', api.CategoryViewSet)
router.register(r'check', api.CheckViewSet)


urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^$', views.Index.as_view(), name='index'),
]
