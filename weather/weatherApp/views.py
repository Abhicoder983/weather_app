from rest_framework.response import Response
import requests
from rest_framework.views import APIView
from rest_framework import status

class MyDataView(APIView):
    def get(self, request):
        
        # try:
        #     # Fetch data from an external API
        #     external_api_url = "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=80df6002a45008f2c9a67347c7abf1b0"  # Replace with the actual API URL
        #     response = requests.get(external_api_url)
        #     response.raise_for_status()  # Raise an HTTPError for bad responses

        #     data = response.json()  # Parse the JSON data from the response
        #     return Response(data, status=status.HTTP_200_OK)
        
        # except requests.exceptions.RequestException as e:
        #     return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # Handle GET request
        data = {"message": "Hello, this is a GET response!"}
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        # Handle POST request
        received_data = request.data
        print(received_data)
        try:
            # Fetch data from an external API
           
                external_api_url = f"https://api.openweathermap.org/data/2.5/weather?q={received_data['data']}&appid=80df6002a45008f2c9a67347c7abf1b0"  # Replace with the actual API URL
                print(external_api_url)
                response = requests.get(external_api_url)
                response.raise_for_status()  # Raise an HTTPError for bad responses

                data = response.json()  # Parse the JSON data from the response
                return Response(data, status=status.HTTP_200_OK)
           
            
        
        except requests.exceptions.RequestException as e:
                print('abhishek')
                return Response({"error": 'your location is not found'}) 
      
        # Here you can process the received_data as needed
        response_data = {"message": "POST request received!", "data": received_data}
        return Response(response_data, status=status.HTTP_200_OK)
