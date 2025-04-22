from django.urls import path
from .views import get_configs, save_configs

urlpatterns = [
    path('configs/', get_configs),
    path('configs/save/', save_configs),
]