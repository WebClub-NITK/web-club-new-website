from django.urls import path,include
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from blogs.views import GoogleLogin


urlpatterns = [
    # path('',views.homepage),
    path('', views.HelloView.as_view(), name='hello'),
    # path('api-token-auth/', views.obtain_auth_token),
    path('searchBlogWithTag',views.searchBlogWithTag),
    path('getblogs',views.loadBlogs),
    path('getblogs/<id>',views.loadBlog),
    path('addblog',views.postBlog),
    path('rest-auth/google/', GoogleLogin.as_view(), name='google_login')
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]