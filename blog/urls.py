from django.conf.urls import url

from blog import views


urlpatterns = [
    url(r'^$', views.Index.as_view(), name='blog_index'),
    url(r'^p/(?P<pk>\d+)/$', views.ViewPost.as_view(), name='view_post'),
    url(r'^write/(?P<pk>\d+)?/?$', views.WritePost.as_view(), name='write_post'),
    url(r'^submit_post/(?P<pk>\d+)?/?$', views.SubmitPost.as_view(), name='submit_post'),
    url(r'^p/(?P<post_pk>\d+)/comment/$', views.SubmitComment.as_view(), name='submit_comment'),
]
