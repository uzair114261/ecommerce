from rest_framework import serializers
from .models import ProductOrders
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductOrders
        fields = '__all__'