from django.http import Http404

from blog.views import BaseTemplateView
from blog.models import Post


class ViewPost(BaseTemplateView):
    template_name = 'blog/view_post.html'

    def get_context_data(self, pk, **kwargs):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            raise Http404()
        context = {
            'view': self,
            'post': post,
            'comments': post.comment_set.select_related('user').all(),
        }
        return context
