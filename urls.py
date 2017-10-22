import os

from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.views.generic.base import RedirectView

import puput.urls


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^auth/', include('authentication.urls')),
    url(r'^authentication/', include('authentication.urls')),
    url(r'^treasurer/', include('treasurer.urls')),
    url(r'', include(puput.urls)),
    # url(r'^$', RedirectView.as_view(url='treasurer/', permanent=False), name='index')
]

if settings.DEBUG:
    urlpatterns += staticfiles_urlpatterns() # tell gunicorn where static files are in dev mode
    urlpatterns += static(settings.MEDIA_URL + 'images/', document_root=os.path.join(settings.MEDIA_ROOT, 'images'))
