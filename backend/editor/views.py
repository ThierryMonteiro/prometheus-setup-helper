from django.shortcuts import render

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response
import yaml

@api_view(["GET"])
def get_configs(request):
    with open('/etc/prometheus.yml', 'r') as f:
        data = yaml.safe_load(f)
    return Response(data.get('scrape_configs', []))

@api_view(["POST"])
def save_configs(request):
    yaml_content = request.body.decode('utf-8')
    with open('prometheus.yml', 'w') as f:
        f.write(yaml_content)
    return Response({"message": "Saved successfully"})
