from django.shortcuts import render
from .models import Posts, User, Reply
from .serializers import PostsSerializer, userSerializer, ReplySerializer, MyTokenObtainPairSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import permissions, status
from rest_framework.views import APIView
from django.http import Http404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken


class userCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer


class userView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer


class userCreatePostView(generics.CreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer


class userPostView(generics.ListAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer


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


class userViewId(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer
    lookup_field = 'pk'


class userPostViewId(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
    lookup_field = 'title'


class replyView(generics.CreateAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer


class replyViewId(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reply.objects.all()
    serializer_class = ReplySerializer
    lookup_field = 'post'
