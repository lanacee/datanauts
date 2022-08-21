from .models import PestTrap, Observation
from rest_framework import serializers

class PestTrapSerializer(serializers.ModelSerializer):
    # Append current user to API request, so you don't need to directly fetch user id.
    # See discussion https://stackoverflow.com/a/64991320
    def create(self, validated_data):

        # request = self.context.get("request")

        pest_trap = PestTrap()
        pest_trap.name = validated_data["name"]
        pest_trap.UniqueId = validated_data["uniqueId"]
        pest_trap.description = validated_data["description"]
        # pest_trap.users = request.user

        pest_trap.save()

        return pest_trap

    class Meta:
        """
        https://www.django-rest-framework.org/api-guide/serializers/#modelserializer
        Also in tutorial, note that a Serializer is like a Form class, whereas a ModelSerializer
        is like a ModelForm because it maps to a class.
        https://www.django-rest-framework.org/tutorial/1-serialization/#using-modelserializers
        """

        model = PestTrap
        # https://www.django-rest-framework.org/api-guide/relations/

        exclude = ["users"]
        extra_kwargs = {"users": {"required": False}}