from django.shortcuts import redirect
from django.urls import reverse

from blog.views import BaseView
from blog.models import Comment


class SubmitComment(BaseView):
    @staticmethod
    def post(request, post_pk, pk=None):
        body = request.POST.get('body')

        if not body:
            return redirect(reverse('view_post', kwargs={'pk': post_pk}))

        Comment.objects.create(
            user=request.user,
            post_id=post_pk,
            body=body,
        )
        return redirect(reverse('view_post', kwargs={'pk': post_pk}))
