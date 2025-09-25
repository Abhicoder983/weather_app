from django.contrib import admin
from django.urls import path, include
from weatherApp import views

urlpatterns = [
    path('api/mydata/', views.MyDataView.as_view(), name='mydata'),
]