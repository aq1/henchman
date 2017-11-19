from django.shortcuts import render, get_object_or_404

from blog.views import BaseView
from blog.models import Post


class WritePost(BaseView):
    template_name = 'blog/write_post.html'

    def get(self, request, pk=None):
        context = {
            'view': self,
        }
        if pk:
            context['post'] = get_object_or_404(Post, pk=pk, user=request.user)
        return render(request, self.template_name, context=context)
