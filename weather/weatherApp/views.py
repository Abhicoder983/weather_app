from rest_framework.response import Response
import requests
from rest_framework.views import APIView
from rest_framework import status

class MyDataView(APIView):
   
        
    def post(self, request):
        
        received_data = request.data
        print(received_data)
        try:
            
           
                external_api_url = f"https://api.openweathermap.org/data/2.5/weather?q={received_data['data']}&appid=80df6002a45008f2c9a67347c7abf1b0"
                print(external_api_url)
                response = requests.get(external_api_url)
                response.raise_for_status()  
                data = response.json()  
                print(data)
                  
                return Response(data, status=status.HTTP_200_OK)
           
            
        
        except requests.exceptions.RequestException as e:
                print('abhishek')
                
                return Response({"error": "(not found)",
                                 "coord": {"lon": 0, "lat": 0},
                                 "wind": {"speed": 0},
                "main":{"temp":"273",
                        "feels_like":"273" ,
                        "humidity":"0",
                        "pressure":"0",

                        
                }
                }) 
      
       