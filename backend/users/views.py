from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import CustomerSerializer
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password, check_password
from users.models import Customers
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['POST'])
def create_customer(request):
    if request.method == 'POST':
        data = request.data.copy()
        data['password'] = make_password(data.get('password'))
        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            email = data.get('email')
            phone_number = data.get('phone_number')
            if Customers.objects.filter(email=email).exists():
                return Response({'error': 'Email Already exists'}, status=status.HTTP_400_BAD_REQUEST)
            elif Customers.objects.filter(phone_number=phone_number).exists():
                return Response({'error': 'Phone Number Already exists'}, status=status.HTTP_400_BAD_REQUEST)

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'Invalid Method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            customer = Customers.objects.get(email=email)
        except Customers.DoesNotExist:
            return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)

        if not check_password(password, customer.password):
            return Response({'error': 'Invalid Password'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(customer)
        access_token = refresh.access_token
        cust_data = {
                'id': customer.id,
                'name': customer.name,
                'email': customer.email,
                'phone': customer.phone_number,
                'user_image': customer.user_image.url if customer.user_image else None
        }
        data = {
            'refresh': str(refresh),
            'access': str(access_token),
            'user': cust_data
        }

        return Response(data, status=status.HTTP_200_OK)