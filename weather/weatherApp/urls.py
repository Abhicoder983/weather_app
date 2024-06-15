from django.contrib import admin
from django.urls import path, include
import weatherApp.views 

urlpatterns = [
    path('api/mydata/', weatherApp.views.MyDataView.as_view(), name='mydata'),
]