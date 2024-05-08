from django.db import models
from django.utils.text import slugify

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    image_url = models.ImageField(upload_to='products')
    stock_quantity = models.PositiveIntegerField()
    slug = models.SlugField(unique=True, default=None)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name