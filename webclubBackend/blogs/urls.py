from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.homepage),
    path('searchBlogWithTag',views.searchBlogWithTag),
    path('getblogs',views.loadBlogs),
    path('getblogs/<id>',views.loadBlog),
    path('addblog',views.postBlog)
]