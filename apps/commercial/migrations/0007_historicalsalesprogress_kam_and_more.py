# Generated by Django 4.2.4 on 2023-10-04 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commercial', '0006_remove_historicalsalesprogress_pfi_id_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalsalesprogress',
            name='kam',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='KAM'),
        ),
        migrations.AddField(
            model_name='historicalsalesprogress',
            name='po_number',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='PO'),
        ),
        migrations.AddField(
            model_name='salesprogress',
            name='kam',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='KAM'),
        ),
        migrations.AddField(
            model_name='salesprogress',
            name='po_number',
            field=models.CharField(blank=True, max_length=255, null=True, verbose_name='PO'),
        ),
    ]
