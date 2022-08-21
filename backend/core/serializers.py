from .models import PestTrap, Observation
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id','username']

class PestTrapSerializer(serializers.ModelSerializer):
    # Append current user to API request, so you don't need to directly fetch user id.
    # See discussion https://stackoverflow.com/a/64991320
    # pestTrap_users = UserSerializer(many=True, read_only=False, source='users')
    # id = serializers.Field()
    # def create(self, validated_data):

    #     # request = self.context.get("request")

    #     pest_trap = PestTrap()
    #     pest_trap.name = validated_data["name"]
    #     pest_trap.UniqueId = validated_data["uniqueId"]
    #     pest_trap.description = validated_data["description"]
    #     # pest_trap.users = request.user

    #     pest_trap.save()

    #     return pest_trap
    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.save()
    #     return instance

    # def update(self, instance, validated_data):

    #     request = self.context.get("request")

    #     pest_trap = PestTrap()
    #     instance.name = validated_data.get("name",instance.name)
    #     instance.UniqueId = validated_data["uniqueId"]
    #     instance.description = validated_data["description"]
    #     instance.users = validated_data["users"]
    #     # pest_trap.users = pest_trap.users.push(request.user)

    #     pest_trap.save()

    #     return pest_trap

    class Meta:
        """
        https://www.django-rest-framework.org/api-guide/serializers/#modelserializer
        Also in tutorial, note that a Serializer is like a Form class, whereas a ModelSerializer
        is like a ModelForm because it maps to a class.
        https://www.django-rest-framework.org/tutorial/1-serialization/#using-modelserializers
        """

        model = PestTrap
        fields = ["id","name","UniqueId","description","users"]
        # https://www.django-rest-framework.org/api-guide/relations/

        # exclude = ["users"]
        # extra_kwargs = {"users": {"required": False}}