from django.contrib import auth

from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

from authentication.serializers import UserSerializer


@api_view(['post'])
@authentication_classes([])
@permission_classes([AllowAny])
def login(request):
    username = request.data.get('username', None)
    password = request.data.get('password', None)

    user = auth.authenticate(username=username, password=password)

    if user is not None:
        if user.is_active:
            auth.login(request, user)

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
