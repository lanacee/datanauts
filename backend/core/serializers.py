from .models import PestTrap, Observation
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id','username']

class PestTrapSerializer(serializers.ModelSerializer):

    class Meta:
        """
        https://www.django-rest-framework.org/api-guide/serializers/#modelserializer
        Also in tutorial, note that a Serializer is like a Form class, whereas a ModelSerializer
        is like a ModelForm because it maps to a class.
        https://www.django-rest-framework.org/tutorial/1-serialization/#using-modelserializers
        """

        model = PestTrap
        fields = ["id","name","UniqueId","description","users"]