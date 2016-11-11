from rest_framework.viewsets import ModelViewSet


class BaseModelViewSet(ModelViewSet):

    def paginate_queryset(self, queryset):
        if self.request.GET.get('all'):
            return None
        return super().paginate_queryset(queryset)
