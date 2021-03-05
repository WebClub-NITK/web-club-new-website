from django.urls import path,include
from . import views

urlpatterns = [
    path('', views.HelloView.as_view(), name='hello'),
    path('searchBlogWithTag',views.searchBlogWithTag),
    path('getblogs',views.loadBlogs),
    path('getblogs/<id>',views.loadBlog),
    path('addblog',views.postBlog),
    path('googlelogin',views.validate_google_login_token, name='google_login')
]