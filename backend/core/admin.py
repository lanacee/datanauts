from django.contrib import admin
from .models import PestTrap, Observation

# Register your models here.
admin.site.register(PestTrap)
admin.site.register(Observation)