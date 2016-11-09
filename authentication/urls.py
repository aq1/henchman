from django.conf.urls import url, include
from django.contrib import admin

from rest_framework.routers import DefaultRouter

from authentication import views

admin.autodiscover()

router = DefaultRouter(trailing_slash=False)
router.register(r'user', views.UserViewSet)


urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^login/$', views.login, name='login'),
    url(r'^register/$', views.register, name='register'),
]
