from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from product.models import Product
from product.serializers import ProductSerializer


class Products(APIView):
    def get(self, request, format=None):
        slug = request.query_params.get('slug')  # Get the slug parameter from the request
        if slug:
            try:
                product = Product.objects.get(slug=slug)
                serializer = ProductSerializer(product)
                return Response(serializer.data)
            except Product.DoesNotExist:
                return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            products = Product.objects.all().order_by('-id')
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
