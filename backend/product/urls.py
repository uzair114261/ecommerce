from django.urls import path
from product import views

urlpatterns = [
    path('api/', views.Products.as_view(), name='products')
]
