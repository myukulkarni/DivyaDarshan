# Generated by Django 5.1.6 on 2025-02-20 12:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0015_remove_timeslot_time_range_timeslot_new_time_range_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking',
            name='time_slot',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.timeslot'),
        ),
    ]
