# Generated by Django 5.0.1 on 2024-04-04 07:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='productorders',
            name='price',
            field=models.CharField(default='None', max_length=20),
        ),
    ]
