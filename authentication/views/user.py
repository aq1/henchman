from django.contrib.auth import logout

from rest_framework import viewsets, status
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.authentication import TokenAuthentication

from authentication.models import User

from authentication.serializers import UserSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = []

    @list_route(methods=['get'])
    def get_current(self, request):
        if request.auth and request.auth.user:
            return Response(UserSerializer(request.auth.user).data)
        return Response(status=HTTP_401_UNAUTHORIZED)

    @list_route(methods=['get'])
    def logout(self, request):
        if request.auth and request.auth.user:
            request.auth.delete()
            logout(request)
            return Response()
        return Response(status=status.HTTP_404_NOT_FOUND)
