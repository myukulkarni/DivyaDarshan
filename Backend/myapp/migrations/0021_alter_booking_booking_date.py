# Generated by Django 5.1.6 on 2025-02-22 10:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0020_alter_booking_booking_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='booking_date',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.slotdate'),
        ),
    ]
