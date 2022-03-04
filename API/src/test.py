
import requests

BASE = "http://127.0.0.1:5000/"

response = requests.get(BASE + "summary/Kiyo Kun!")
print(response.json())