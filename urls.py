from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.base import RedirectView


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^auth/', include('authentication.urls')),
    url(r'^treasurer/', include('treasurer.urls')),
    url(r'^.*$', RedirectView.as_view(url='treasurer/', permanent=False), name='index')
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_ROOT, document_root=settings.STATIC_ROOT)
