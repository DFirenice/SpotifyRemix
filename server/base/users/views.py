from django.shortcuts import render
from rest_framework import filters
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from .serializers import CustomUserSerializer

# ViewSet for getting a list of users
class UsersViewSet(ViewSet):
    filter_backends = filters.SearchFilter
    search_fields = ["username"]

    def list(self, request):
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True, context={'request': request})
        return Response({"users": serializer.data})
    
    def retrieve(self, request, pk=None):
        user = CustomUser.objects.get(pk=pk)
        serializer = CustomUserSerializer(user, context={'request': request})
        return Response({"user": serializer.data})
    
    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        return Response(CustomUserSerializer(request.user).data)