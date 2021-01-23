from django.shortcuts import render
from .models import blogs, tag, taginblog
from django.db import IntegrityError
from django.http import JsonResponse
from django.http import HttpResponseRedirect, HttpResponse
import json
from django.core.exceptions import FieldDoesNotExist
import datetime
import ast
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
#
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your views here.

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    
class HelloView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Hello, World!'}
        print(request.user)
        return Response(content)


def homepage(request):

    return HttpResponse('<h1>bharat singh</h1>')

# this is of no use as sorting blogs is done on react side


def searchBlogWithTag(request):
    tagName = request.GET['tagName']
    print(tagName)
    blogwithtag = taginblog.objects.filter(tag__name=tagName).values('blog')
    searchedBlogs = []
    for k in blogwithtag:
        print(k['blog'])
        searchedBlogs += [blogs.objects.values('id','heading').get(id=k['blog'])]
    print(blogwithtag)
    print(searchedBlogs)
    return JsonResponse({'searchedBlogs': searchedBlogs})


def loadBlogs(request):  # this will load all blogs on /blogs path
    blog_obj = blogs.objects.values(
        'heading', 'id', 'sample_text', 'date', 'user_name').order_by('-id')
    data = []
    for k in blog_obj:
        temp = dict()
        temp['blog'] = k
        tag_list = []
        for k in taginblog.objects.filter(blog_id=k['id']):
            tag_list += [tag.objects.get(id=k.tag_id).name]
        temp['tags'] = tag_list
        data += [temp]
    return JsonResponse({'blogs': data})


def loadBlog(request, id):  # loads specific blog with blog id
    try:
        blog = blogs.objects.get(id=id)
    except blogs.DoesNotExist:
        return HttpResponse(0)
    temp = dict()
    temp['id'] = blog.id
    temp['heading'] = blog.heading
    temp['content'] = blog.content
    temp['sample_text'] = blog.sample_text
    temp['date'] = blog.date
    temp['user_email'] = blog.user_email
    temp['writer'] = blog.user_name
    tag_list = []
    for k in taginblog.objects.filter(blog_id=temp['id']):
        tag_list += [tag.objects.get(id=k.tag_id).name]
    temp['tag_list'] = tag_list
    return JsonResponse(temp)


def postBlog(request):

    a = request.body
    temp = json.loads(a)

    obj = blogs()
    obj.heading = temp['heading']
    obj.user_email = temp['user_email']
    obj.user_name = temp['user_name']
    obj.content = temp['content']
    obj.date = datetime.date.today()
    obj.sample_text = temp['sample_text']
    print(temp['tag_list'])
    obj.save()
    for k in temp['tag_list']:
        try:
            tag_obj = tag.objects.get(name=k)
        except tag.DoesNotExist:
            tag_obj = tag()
            tag_obj.name = k
            tag_obj.save()
        try:
            taginblog_obj = taginblog()
            taginblog_obj.blog = obj
            taginblog_obj.tag = tag_obj
            taginblog_obj.save()
        except IntegrityError:
            print("already there")

    print(temp['heading'])
    return HttpResponse('Success')
