from django.shortcuts import render
from rest_framework.response import Response
import requests
from rest_framework.decorators import api_view


@api_view(['GET'])
def index(request):

    Url='https://api.covid19india.org/data.json'
    respose= requests.get(Url)
    data=respose.json()
    return Response(data)


# Create your views here.
