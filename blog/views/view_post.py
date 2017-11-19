from django.shortcuts import get_object_or_404

from blog.views import BaseTemplateView
from blog.models import Post


class ViewPost(BaseTemplateView):
    template_name = 'blog/view_post.html'

    def get_context_data(self, pk, **kwargs):
        context = {
            'view': self,
            'post': get_object_or_404(Post, pk=pk, user=self.request.user),
        }
        return context
