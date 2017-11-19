import os

from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from apps_router.views import Router


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^auth/', include('authentication.urls')),
    url(r'^authentication/', include('authentication.urls')),
    url(r'^treasurer/', include('treasurer.urls'), name='treasurer'),
    url(r'^blog/', include('blog.urls'), name='blog'),
    url(r'^$', Router.as_view(), name='blog'),
]

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns() # tell gunicorn where static files are in dev mode
    urlpatterns += static(settings.MEDIA_URL, document_root=os.path.join(settings.MEDIA_ROOT))
