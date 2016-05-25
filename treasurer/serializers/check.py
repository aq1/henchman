from rest_framework import serializers
from treasurer.models import Check


class CheckSerializer(serializers.ModelSerializer):

    class Meta:
        model = Check
        fields = 'id', 'transaction', 'photo'
