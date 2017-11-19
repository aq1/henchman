from blog.views import BaseView
from blog.models import Post


class WritePost(BaseView):
    template_name = 'blog/write_post.html'

    def get_context_data(self, **kwargs):
        kwargs.update(super().get_context_data(**kwargs))
        kwargs['posts'] = Post.objects.all()[:5]
        return kwargs
