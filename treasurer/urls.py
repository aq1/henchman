from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from treasurer import api
from treasurer import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', api.UserViewSet)
router.register(r'accounts', api.AccountViewSet)
router.register(r'transactions', api.TransactionViewSet)
router.register(r'categories', api.CategoryViewSet)
router.register(r'check', api.CheckViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'', views.index, name='index'),
    url(r'api/v1/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
