from django.db import models
from django.utils import timezone


class Question(models.Model):
    index = models.AutoField(primary_key=True)
    question = models.CharField(max_length=300)
    answerA = models.CharField(max_length=300)
    answerB = models.CharField(max_length=300)
    answerC = models.CharField(max_length=300)
    answerD = models.CharField(max_length=300)
    answer = models.CharField(max_length=5)

    def __str__(self):
        return str(self.index)


class Userinfo(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    score = models.IntegerField(default=0)
    index = models.IntegerField(default=1)
    image = models.CharField(max_length=200,default='')
    name = models.CharField(max_length=100,default='')

    def __str__(self):
        return str(self.id)


class Paper(models.Model):
    paperID = models.AutoField(primary_key=True)
    userID = models.ForeignKey('Userinfo', on_delete=models.CASCADE)
    paper_content = models.TextField(max_length=3000, null=True)
    title = models.CharField(max_length=100)
    score = models.IntegerField()
    key_word = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.paperID)


class agreement(models.Model):
    id = models.AutoField(primary_key=True)
    userID = models.ForeignKey('Userinfo', on_delete=models.CASCADE)
    paperID = models.ForeignKey('Paper', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.id)


class News(models.Model):
    id = models.AutoField(primary_key=True)
    paper_content = models.TextField(max_length=10000)
    title = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=10)


class errorQuestion(models.Model):
    userID = models.ForeignKey('Userinfo', on_delete=models.CASCADE)
    index = models.ForeignKey('Question', on_delete=models.CASCADE)
