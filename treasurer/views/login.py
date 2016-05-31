from django.contrib.auth import authenticate, login

from rest_framework import status, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from treasurer.serializers import UserSerializer


class LoginView(views.APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):

        username = request.data.get('username', None)
        password = request.data.get('password', None)

        user = authenticate(username=username, password=password)

        if user is not None:
            if user.is_active:
                login(request, user)

                serialized = UserSerializer(user)
                token = Token.objects.get_or_create(user=user)[0].key

                return Response({'user': serialized.data, 'token': token})
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This user has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)
