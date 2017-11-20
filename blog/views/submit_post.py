from django.shortcuts import    get_object_or_404, redirect
from django.urls import reverse

from blog.views import BaseView
from blog.models import Post


class SubmitPost(BaseView):
    @staticmethod
    def post(request, pk=None):
        title = request.POST.get('title')
        body = request.POST.get('body')

        if not (body and title):
            return redirect(reverse('blog_index'))

        if pk:
            post = get_object_or_404(Post, pk=pk, user=request.user)
            post.title = title
            post.body = body
            post.save()
            return redirect(reverse('view_post', kwargs={'pk': pk}))
        else:
            post = Post.objects.create(
                user=request.user,
                title=title,
                body=body,
            )
            return redirect(reverse('view_post', kwargs={'pk': post.pk}))
