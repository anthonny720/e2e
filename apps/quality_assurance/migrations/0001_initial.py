# Generated by Django 4.2.4 on 2023-10-02 21:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('logistic', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pineapple',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('maturation_0_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 0 Planta %')),
                ('maturation_1_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 1 Planta %')),
                ('maturation_2_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 2 Planta %')),
                ('maturation_3_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 3 Planta %')),
                ('maturation_4_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 4 Planta %')),
                ('maturation_5_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 5 Planta %')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')),
                ('lot', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='analysis_pineapple', to='logistic.lot', verbose_name='Lote MP')),
            ],
            options={
                'verbose_name': 'Análisis de Piña',
                'verbose_name_plural': 'Análisis de Piña',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Mango',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color_1', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 1')),
                ('color_1_5', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 1,5 ')),
                ('color_2', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 2')),
                ('color_2_5', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 2,5')),
                ('color_3', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 3')),
                ('color_3_5', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 3,5')),
                ('brix_7', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix < 7')),
                ('brix_7_8', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix 7-8')),
                ('brix_8_9', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix 8-9')),
                ('brix_9', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix > 9')),
                ('weight_280', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Peso <280 ')),
                ('weight_280_300', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Peso 280-300 ')),
                ('weight_300', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Peso >300 ')),
                ('mechanical_damage', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Daños mecanicos')),
                ('cracked', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Rajado')),
                ('sun_damage', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Daños de sol')),
                ('anthracnose', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Antracnosis')),
                ('rot', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Podrido')),
                ('latex', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Latex')),
                ('queresa', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Queresa')),
                ('insect_bite', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Picadura de insectos')),
                ('mature', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='maduro')),
                ('overripe', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Sobre maduro')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')),
                ('lot', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='analysis_mango', to='logistic.lot', verbose_name='Lote MP')),
            ],
            options={
                'verbose_name': 'Análisis de Mango',
                'verbose_name_plural': 'Análisis de Mango',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='HistoricalPineapple',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('maturation_0_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 0 Planta %')),
                ('maturation_1_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 1 Planta %')),
                ('maturation_2_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 2 Planta %')),
                ('maturation_3_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 3 Planta %')),
                ('maturation_4_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 4 Planta %')),
                ('maturation_5_plant', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 5 Planta %')),
                ('created_at', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de creación')),
                ('updated_at', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de actualización')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('lot', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='logistic.lot', verbose_name='Lote MP')),
            ],
            options={
                'verbose_name': 'historical Análisis de Piña',
                'verbose_name_plural': 'historical Análisis de Piña',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalMango',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('color_1', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 1')),
                ('color_1_5', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 1,5 ')),
                ('color_2', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 2')),
                ('color_2_5', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 2,5')),
                ('color_3', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 3')),
                ('color_3_5', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Color 3,5')),
                ('brix_7', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix < 7')),
                ('brix_7_8', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix 7-8')),
                ('brix_8_9', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix 8-9')),
                ('brix_9', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix > 9')),
                ('weight_280', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Peso <280 ')),
                ('weight_280_300', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Peso 280-300 ')),
                ('weight_300', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Peso >300 ')),
                ('mechanical_damage', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Daños mecanicos')),
                ('cracked', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Rajado')),
                ('sun_damage', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Daños de sol')),
                ('anthracnose', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Antracnosis')),
                ('rot', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Podrido')),
                ('latex', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Latex')),
                ('queresa', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Queresa')),
                ('insect_bite', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Picadura de insectos')),
                ('mature', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='maduro')),
                ('overripe', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Sobre maduro')),
                ('created_at', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de creación')),
                ('updated_at', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de actualización')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('lot', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='logistic.lot', verbose_name='Lote MP')),
            ],
            options={
                'verbose_name': 'historical Análisis de Mango',
                'verbose_name_plural': 'historical Análisis de Mango',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalGoldenberry',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('maturation_1', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 1 %')),
                ('maturation_2', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 2 %')),
                ('maturation_3', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 3 %')),
                ('mushroom', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Hongos y fermentado')),
                ('green', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Verde')),
                ('cracked', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Rajado')),
                ('crushed', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Aplastado')),
                ('small', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Pequeño<17mm')),
                ('caliz', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Caliz')),
                ('phytosanitary', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Fitosanitario')),
                ('watery', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Consistencia aguada')),
                ('created_at', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de creación')),
                ('updated_at', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de actualización')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('lot', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='logistic.lot', verbose_name='Lote MP')),
            ],
            options={
                'verbose_name': 'historical Análisis de Aguaymanto',
                'verbose_name_plural': 'historical Análisis de Aguaymanto',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalBlueberry',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('average_brix', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix promedio')),
                ('max_brix', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix máximo')),
                ('min_brix', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix mínimo')),
                ('immature_fruit', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Fruta inmadura')),
                ('worn_pedicel', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Pedicelo desgastado')),
                ('remains_flowers', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Restos de flores')),
                ('soft', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Fruta blanda o sobremadura')),
                ('scars', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Cicatrices')),
                ('dehydrated', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Deshidratada')),
                ('created_at', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de creación')),
                ('updated_at', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de actualización')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('lot', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='logistic.lot', verbose_name='Lote MP')),
            ],
            options={
                'verbose_name': 'historical Análisis de Arándanos',
                'verbose_name_plural': 'historical Análisis de Arándanos',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalBanano',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('maturation_1', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 1 %')),
                ('maturation_2', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 2 %')),
                ('maturation_3', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 3 %')),
                ('maturation_4', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 4 %')),
                ('mechanical_damages', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Daños mecánicos')),
                ('broken_neck', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Corte de cuello')),
                ('chafing', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Rozadura')),
                ('scar', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Cicatriz')),
                ('discard', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Descarte')),
                ('created_at', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de creación')),
                ('updated_at', models.DateTimeField(blank=True, editable=False, verbose_name='Fecha de actualización')),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('lot', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='logistic.lot', verbose_name='Lote MP')),
            ],
            options={
                'verbose_name': 'historical Análisis de Banano',
                'verbose_name_plural': 'historical Análisis de Banano',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='Goldenberry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('maturation_1', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 1 %')),
                ('maturation_2', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 2 %')),
                ('maturation_3', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 3 %')),
                ('mushroom', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Hongos y fermentado')),
                ('green', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Verde')),
                ('cracked', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Rajado')),
                ('crushed', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Aplastado')),
                ('small', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Pequeño<17mm')),
                ('caliz', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Caliz')),
                ('phytosanitary', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Fitosanitario')),
                ('watery', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Consistencia aguada')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')),
                ('lot', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='analysis_goldenberry', to='logistic.lot', verbose_name='Lote MP')),
            ],
            options={
                'verbose_name': 'Análisis de Aguaymanto',
                'verbose_name_plural': 'Análisis de Aguaymanto',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Blueberry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('average_brix', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix promedio')),
                ('max_brix', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix máximo')),
                ('min_brix', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Brix mínimo')),
                ('immature_fruit', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Fruta inmadura')),
                ('worn_pedicel', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Pedicelo desgastado')),
                ('remains_flowers', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Restos de flores')),
                ('soft', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Fruta blanda o sobremadura')),
                ('scars', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Cicatrices')),
                ('dehydrated', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Deshidratada')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')),
                ('lot', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='analysis_blueberry', to='logistic.lot', verbose_name='Lote MP')),
            ],
            options={
                'verbose_name': 'Análisis de Arándanos',
                'verbose_name_plural': 'Análisis de Arándanos',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Banano',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('maturation_1', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 1 %')),
                ('maturation_2', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 2 %')),
                ('maturation_3', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 3 %')),
                ('maturation_4', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Maduración 4 %')),
                ('mechanical_damages', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Daños mecánicos')),
                ('broken_neck', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Corte de cuello')),
                ('chafing', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Rozadura')),
                ('scar', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Cicatriz')),
                ('discard', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=5, null=True, verbose_name='Descarte')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Fecha de creación')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Fecha de actualización')),
                ('lot', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='analysis_banana', to='logistic.lot', verbose_name='Lote MP')),
            ],
            options={
                'verbose_name': 'Análisis de Banano',
                'verbose_name_plural': 'Análisis de Banano',
                'ordering': ['-id'],
            },
        ),
    ]
