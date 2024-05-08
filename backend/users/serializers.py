# users/serializers.py
from rest_framework import serializers
from .models import Customers

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers 
        fields = '__all__'  

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customers
        fields = ('email', 'password')