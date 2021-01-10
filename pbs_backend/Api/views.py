from django.shortcuts import render
from .models import Posts
from .serializers import PostSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import permissions, status

class PostsView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    queryset = Posts.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)


class PostEditView(generics.RetrieveUpdateDestroyAPIView, viewsets.ModelViewSet):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer

    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        post = Posts.objects.all()
        return post

    def retrieve(self, request, *args, **kwargs):
        params = kwargs
        user = Posts.objects.filter(id=params['pk'])
        serializer = PostSerializer(user, many=True)
        return Response(serializer.data)
