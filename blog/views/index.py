from blog.views import BaseTemplateView
from blog.models import Post, Comment


class Index(BaseTemplateView):
    template_name = 'blog/index.html'

    def get_context_data(self, **kwargs):
        # It's N+1 problem, but it's okay for now.
        kwargs.update(super().get_context_data(**kwargs))
        kwargs['posts'] = Post.objects.all().select_related('user')[:5]
        for post in kwargs['posts']:
            post.comments = reversed(Comment.objects.select_related('user').filter(post=post).order_by('-id')[:3])
        return kwargs
