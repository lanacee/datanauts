from django.shortcuts import render
from django.views.generic.base import TemplateView
from rest_framework import viewsets, status, mixins
from .models import Observation, PestTrap
from .serializers import PestTrapSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect

# Create your views here.
class IndexView(TemplateView):
    template_name = "core/index.html"


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('/app/')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})


# class CurrentUserView(APIView):
#     def get(self, request):
#         serializer = UserSerializer(request.user)
#         return Response(serializer.data)

class UserViewSet2(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        pk = self.kwargs.get('pk')

        if pk == "current":
            return self.request.user

        return super().get_object()

    def get_queryset(self):
        req = self.request
        if req:
            self.queryset = User.objects.filter(id=req.user.id)
            print("request accessed")
            return self.queryset
        else:
            print("request not accessed")
            return self.queryset


class UserViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = UserSerializer
    # queryset = User.objects.filter(user=self.request.user)

    def get_object(self):
        return self.request.user
        
class PestTrapViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Pest Traps to be viewed or editted.
    """

    queryset = PestTrap.objects.all()
    serializer_class = PestTrapSerializer

    # def get_queryset(self):
    #     req = self.request
    #     if req:
    #         self.queryset = PestTrap.objects.filter(users=req.user)
    #         print("request accessed")
    #         return self.queryset
    #     else:
    #         print("request not accessed")
    #         return self.queryset

    def update(self, request, pk=None, *args, **kwargs):
        user = request.user
        instance = self.get_object()
        print(" user ", instance.users)
        print(" user ", user.id)
        print(" data ", request.data)
        instance.users.add(user)
        instance.save()
        print(" modified instance ", instance.users)
        # modified_data = request.data['users'].append(user.id)
        # print(" data modified ", modified_data)
        # data = {
        #     "title": reques/avatar/9ba3bc1536585f5c59760e2888a6e6f4t.POST.get('title', None),
        #     }
        # serializer = self.serializer_class(instance=instance,
        #                                    data=request.data, # or request.data
        #                                 #    context={'author': user},
        #                                    partial=True)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)