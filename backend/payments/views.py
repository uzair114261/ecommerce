from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import stripe
from django.conf import settings
from product.models import Product
from .serializers import PaymentSerializer
import json


stripe.api_key = settings.STRIPE_TEST_SECRET_KEY

@api_view(['POST'])
def CardTransaction(request):
    if request.method == 'POST':
        purchased_items_str = request.data.get('purchased_items')
        purchased_items = json.loads(purchased_items_str)
        for items in purchased_items:
            product = Product.objects.get(id=items['id'])
            product.stock_quantity -= items['quantity']
            product.save()
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Payment processed successfully.'})
        else:
            return Response(serializer.errors, status=400)
        
    try:
        amount = request.data.get('price')
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='pkr'
        )
        client_secret = intent.client_secret
        return Response({'client_secret': client_secret})
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def CODPurchasedItems(request):
    if request.method == 'POST':
        purchased_items_str = request.data.get('purchased_items')
        purchased_items = json.loads(purchased_items_str)
        for items in purchased_items:
            product = Product.objects.get(id=items['id'])
            product.stock_quantity -= items['quantity']
            product.save()

        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Payment processed successfully.'})
        else:
            return Response(serializer.errors, status=400)

    return Response({'error': 'Invalid request method.'}, status=400)