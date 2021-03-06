from rest_framework import serializers
from treasurer.models import Category


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = 'id', 'name', 'parent', 'level'
