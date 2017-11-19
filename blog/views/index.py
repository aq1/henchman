from blog.views import BaseView
from blog.models import Post


class Index(BaseView):
    template_name = 'blog/index.html'

    def get_context_data(self, **kwargs):
        kwargs.update(super().get_context_data(**kwargs))
        kwargs['posts'] = Post.objects.all()[:5]
        return kwargs
