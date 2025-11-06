from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import Favorite
from .serializers import RegisterSerializer, UserSerializer, FavoriteSerializer

@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'user': UserSerializer(user).data, 'token': token.key}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def login(request):
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'user': UserSerializer(user).data, 'token': token.key})
    return Response({'error': 'Invalid credentials'}, status=400)

class FavoriteListCreate(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FavoriteSerializer

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FavoriteDelete(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FavoriteSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)
