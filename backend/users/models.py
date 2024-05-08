from django.db import models

# Create your models here.
class Customers(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=30, unique=True)
    user_image = models.ImageField(upload_to='Customers', default='None')
    def __str__(self):
        return self.name
    