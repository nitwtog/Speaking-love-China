# Generated by Django 2.1.7 on 2020-03-23 04:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gai', '0009_auto_20200320_1652'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paper',
            name='paper_content',
            field=models.TextField(max_length=3000, null=True),
        ),
    ]
