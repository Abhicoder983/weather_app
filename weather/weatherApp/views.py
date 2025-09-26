from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import requests

class MyDataView(APIView):

    def post(self, request):
        received_data = request.data
        print(received_data)

        lat = received_data.get('lat')
        lon = received_data.get('lon')

        if lat is not None and lon is not None:
            try:
                link = f"https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat={lat}&lon={lon}&accept-language=en"
                headers = {"User-Agent": "MyDjangoApp/1.0"} 
                r = requests.get(link, headers=headers, timeout=5)
                r.raise_for_status()
                data = r.json()
                address = data.get("address", {})
                city_name = (
                    address.get("city") or
                    address.get("town") or
                    address.get("village") or
                    address.get("country")
                )
                received_data['data']=city_name
                print
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            city_name = None

        try:
           
            external_api_url = f"https://api.openweathermap.org/data/2.5/weather?q={received_data['data']}&appid=80df6002a45008f2c9a67347c7abf1b0"
            response = requests.get(external_api_url)
            response.raise_for_status()
            weather_data = response.json()
            return Response(weather_data, status=status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            return Response({
                "error": "(not found)",
                'location':received_data['data'],
                "coord": {"lon": 0, "lat": 0},
                "wind": {"speed": 0},
                "main": {"temp": "273", "feels_like": "273", "humidity": "0", "pressure": "0"}
            })
