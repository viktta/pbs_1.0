from django.shortcuts import render
from .models import Posts, User
from .serializers import PostsSerializer, userSerializer, MyTokenObtainPairSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import permissions, status
from rest_framework.views import APIView
from django.http import Http404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

class userCreateView(APIView):
    def post(self, request, format=None):
        serializer = userSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class userView(APIView):
    def get(self, request, format=None):
        user = User.objects.all()
        serializer = userSerializer(user, many=True)
        return Response(serializer.data)

class userCreatePostView(APIView):
    def post(self, request, format=None):
        serializer = PostsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class userPostView(APIView):
    def get(self, request, format=None):
        posts = Posts.objects.all()
        serializer = PostsSerializer(posts, many=True)
        return Response(serializer.data)

class getTokenView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class userViewId(APIView):
    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = userSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class userPostViewId(APIView):
    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = PostsSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UserRetrieveView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = userSerializer

    def get_queryset(self):
        user = User.objects.all()
        return user

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        user = User.objects.filter(id=params['pk'])
        serializer = userSerializer(user, many=True)
        return Response(serializer.data)