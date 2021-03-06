# Generated by Django 2.1.7 on 2020-03-20 08:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gai', '0008_auto_20200320_1649'),
    ]

    operations = [
        migrations.CreateModel(
            name='agreement',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='errorQuestion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('index', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gai.Question')),
            ],
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('paper_content', models.TextField(max_length=10000)),
                ('title', models.CharField(max_length=100)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('type', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Paper',
            fields=[
                ('paperID', models.AutoField(primary_key=True, serialize=False)),
                ('paper_content', models.CharField(max_length=2000, null=True)),
                ('title', models.CharField(max_length=100)),
                ('score', models.IntegerField()),
                ('key_word', models.CharField(max_length=100)),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Userinfo',
            fields=[
                ('id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('score', models.IntegerField(default=0)),
                ('index', models.IntegerField(default=1)),
                ('image', models.CharField(default='', max_length=200)),
                ('name', models.CharField(default='', max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='paper',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gai.Userinfo'),
        ),
        migrations.AddField(
            model_name='errorquestion',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gai.Userinfo'),
        ),
        migrations.AddField(
            model_name='agreement',
            name='paperID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gai.Paper'),
        ),
        migrations.AddField(
            model_name='agreement',
            name='userID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gai.Userinfo'),
        ),
    ]
