# Generated by Django 2.1.7 on 2020-03-20 08:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gai', '0007_auto_20200320_1505'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='agreement',
            name='paperID',
        ),
        migrations.RemoveField(
            model_name='agreement',
            name='userID',
        ),
        migrations.RemoveField(
            model_name='errorquestion',
            name='index',
        ),
        migrations.RemoveField(
            model_name='errorquestion',
            name='userID',
        ),
        migrations.DeleteModel(
            name='News',
        ),
        migrations.RemoveField(
            model_name='paper',
            name='userID',
        ),
        migrations.DeleteModel(
            name='agreement',
        ),
        migrations.DeleteModel(
            name='errorQuestion',
        ),
        migrations.DeleteModel(
            name='Paper',
        ),
        migrations.DeleteModel(
            name='Userinfo',
        ),
    ]
