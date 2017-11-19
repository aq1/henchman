from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.views.generic import TemplateView
from django.views import View


class BaseTemplateView(TemplateView):

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(BaseTemplateView, self).dispatch(*args, **kwargs)


class BaseView(View):

    @method_decorator(login_required)
    def dispatch(self, *args, **kwargs):
        return super(BaseView, self).dispatch(*args, **kwargs)
