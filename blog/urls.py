from django.conf.urls import url

from blog import views


urlpatterns = [
    url(r'^$', views.Index.as_view(), name='blog_index'),
    url(r'^write/$', views.WritePost.as_view(), name='write_post'),
]
