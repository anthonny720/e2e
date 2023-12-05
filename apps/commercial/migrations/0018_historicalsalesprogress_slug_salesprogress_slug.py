# Generated by Django 4.2.4 on 2023-10-04 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commercial', '0017_alter_historicalsalesprogress_end_process_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalsalesprogress',
            name='slug',
            field=models.SlugField(blank=True, editable=False, max_length=255, null=True, verbose_name='Slug'),
        ),
        migrations.AddField(
            model_name='salesprogress',
            name='slug',
            field=models.SlugField(blank=True, editable=False, max_length=255, null=True, verbose_name='Slug'),
        ),
    ]
