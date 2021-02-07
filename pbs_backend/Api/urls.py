from django.urls import path
from .views import userCreateView, userView, userViewId, userPostViewId,replyViewId,replyView, userPostView, userCreatePostView, LogoutAndBlacklistRefreshTokenForUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('uc/', userCreateView.as_view(), name='create_user'),
    path('uv/', userView.as_view(), name='get_users'),
    path('ucpv/', userCreatePostView.as_view(), name='user-create-posts'),
    path('upv/', userPostView.as_view(), name='get_all_user_posts'),
    path('gtv/', TokenObtainPairView.as_view(), name='user_get_token'),
    path('uv/<pk>/', userViewId.as_view(), name='get_user_by_id'),
    path('upv/<str:title>/', userPostViewId.as_view(), name='get_user_post_by_id'),
    path('tr/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('ltv/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='logut_view'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('rpv/', replyView.as_view(), name='reply-view'),
    path('rpv/<int:post>/', replyViewId.as_view({'get': 'retrieve'}), name='reply-view-id')
]
