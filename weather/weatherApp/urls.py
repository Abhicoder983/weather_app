from django.contrib import admin
from django.urls import path, include
import weatherApp.views 

urlpatterns = [
    
    path("api/" , weatherApp.views.index),
    
]