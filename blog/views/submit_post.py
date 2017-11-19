from django.shortcuts import render, get_object_or_404, redirect
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
            updated = Post.objects.filter(pk=pk, user=request.user).update(
                title=title,
                body=body,
            )
            if updated:
                return redirect(reverse('view_post', kwargs={'pk': pk}))
        else:
            post = Post.objects.create(
                user=request.user,
                title=title,
                body=body,
            )
            return redirect(reverse('view_post', kwargs={'pk': post.pk}))
        return redirect(reverse('blog_index'))
