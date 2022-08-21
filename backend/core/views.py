from django.shortcuts import render
from django.views.generic.base import TemplateView
from rest_framework import viewsets
from .models import Observation, PestTrap
from .serializers import PestTrapSerializer

# Create your views here.
class IndexView(TemplateView):
    template_name = "core/index.html"

class PestTrapViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Pest Traps to be viewed or editted.
    """

    queryset = PestTrap.objects.all()
    serializer_class = PestTrapSerializer

    def get_queryset(self):
        req = self.request
        if req:
            self.queryset = PestTrap.objects.filter(users=req.user)
            print("request accessed")
            return self.queryset
        else:
            print("request not accessed")
            return self.queryset
