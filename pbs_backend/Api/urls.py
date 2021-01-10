from django.urls import path
from .views import PostsView, PostEditView

urlpatterns = [
    path('posts/', PostsView.as_view()),
    path('posts/edit/<int:pk>/', PostEditView.as_view({'get': 'retrieve'}), name='posts-edit-list-by-id'),
]
