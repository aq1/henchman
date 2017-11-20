from blog.views import BaseTemplateView
from blog.models import Post


class Index(BaseTemplateView):
    template_name = 'blog/index.html'

    def get_context_data(self, **kwargs):
        kwargs.update(super().get_context_data(**kwargs))
        kwargs['posts'] = Post.objects.all().select_related('user')[:5]
        return kwargs
