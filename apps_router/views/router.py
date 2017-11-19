from django.views.generic.base import TemplateView


class Router(TemplateView):
    template_name = 'apps_router/router.html'
