from rest_framework import serializers

from authentication.models import User

from treasurer.models import Account


class UserSerializer(serializers.ModelSerializer):

    accounts = serializers.PrimaryKeyRelatedField(many=True, queryset=Account.objects.all())

    class Meta:
        model = User
        fields = 'id', 'email', 'first_name', 'last_name', 'accounts'
