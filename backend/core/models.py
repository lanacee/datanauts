from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PestTrap(models.Model):
    # Multi-tenancy model
    name = models.CharField(max_length=100)
    UniqueId = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    users = models.ManyToManyField(User, blank=True)

# Create your models here.
class Observation(models.Model):
    # Multi-tenancy model
    name = models.CharField(max_length=100)
    UniqueId = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    pestTrap = models.ForeignKey(PestTrap, on_delete=models.CASCADE)

# # Grower subscribes to receive notifications for a particular pesttrap
# class PestTrapByGrower(models.Model):
#     pestTrap = models.ForeignKey(PestTrap)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)