# Generated by Django 4.2.4 on 2023-10-03 00:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('operations_and_planning', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='sap',
            field=models.CharField(blank=True, max_length=10, null=True, verbose_name='Código SAP'),
        ),
    ]
