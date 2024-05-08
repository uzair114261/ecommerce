from django.db import models

# Create your models here.
class ProductOrders(models.Model):
    cust_name = models.CharField(max_length=100)
    cust_email = models.EmailField()
    cust_phone = models.CharField(max_length=30)
    cust_address = models.CharField(max_length=300)
    price = models.CharField(max_length=20, default='None')
    payment_method = models.CharField(max_length=20)
    def __str__(self):
        return self.cust_name