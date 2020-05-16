from django.db.models import Q
from django.http import HttpResponse
import json
from gai.models import *
import pymysql
import jieba.analyse


questions_number = len(Question.objects.all().values())


def test(request):
    test = request.GET.get('test', '')
    test = pymysql.escape_string(test)
    print(len(test))
    print(test)
    return HttpResponse(1)


def createUser(request):
    userID = request.GET.get('userID', '')
    image = request.GET.get('image', '')
    name = request.GET.get('name', '')
    name = pymysql.escape_string(name)
    try:
        Userinfo.objects.create(id=userID, image=image, name=name)
        return HttpResponse(True)
    except Exception:
        user = Userinfo(id=userID)
        info = Userinfo.objects.filter(id=userID).values()
        user.index = info[0]['index']
        user.score = info[0]['score']
        user.name = name
        user.image = image
        user.save()
        return HttpResponse(False)


def getUserinfo(request):
    userID = request.GET.get('userID', '')
    info = Userinfo.objects.filter(id=userID).values()
    re = json.dumps({'Userinfo': info[0]}, ensure_ascii=False)  # , encoding='utf-8')
    return HttpResponse(re)


def questionsByIndex(request):
    index = request.GET.get('index', '')
    question = Question.objects.filter(index=index).values()
    i = question[0]
    re = json.dumps({'question': i}, ensure_ascii=False)  # , encoding='utf-8')
    return HttpResponse(re)


def questionsByUserID(request):
    userID = request.GET.get('userID', '')
    info = Userinfo.objects.filter(id=userID).values()
    index = info[0]['index']
    question = Question.objects.filter(index=index).values()
    i = question[0]
    re = json.dumps({'question': i}, ensure_ascii=False)  # , encoding='utf-8')
    return HttpResponse(re)


def increaseIndex(request):
    userID = request.GET.get('userID', '')
    info = Userinfo.objects.filter(id=userID).values()
    index = info[0]['index']
    print(index)
    index += 1
    if index > questions_number:
        index = 1
    user = Userinfo(id=userID)
    user.score=info[0]['score']+1
    user.index = index
    user.save(update_fields=['index','score'])
    return HttpResponse(True)


def erroQuestion(request):
    index = request.GET.get('index', '')
    userID = request.GET.get('userID', '')
    Ierror = errorQuestion.objects.filter(index=index, userID=userID)

    #     Ierror.delete()
    #     return HttpResponse(False)
    # else:
    
    info = Userinfo.objects.filter(id=userID).values()
    user = Userinfo(id=userID)
    user.score=info[0]['score']-1
    user.save(update_fields=['score'])
    if len(Ierror.values()) > 0:
        return HttpResponse(False)
    errorQuestion.objects.create(index=Question.objects.get(index=index), userID=Userinfo.objects.get(id=userID))
    return HttpResponse(True)

def myError(request):
    userID = request.GET.get('userID', '')
    Ierror = errorQuestion.objects.filter(userID=userID).values()
    all_error=[]
    for i in Ierror:
        index = i['index_id']
        q = Question.objects.filter(index=index).values()[0]
        q['ckeck']="查看答案"
        all_error.append(q)
    re = json.dumps({'error': all_error}, ensure_ascii=False)  # , encoding='utf-8')
    return HttpResponse(re)

def news(request):
    number_begin = int(request.GET.get('number_begin', 0))
    number_end = int(request.GET.get('number_end', 20))
    news = News.objects.all()
    all_of_news = []
    for i in news.values():
        i['date'] = str(i['date'])[:10]
        all_of_news.append(i)
    re = json.dumps({'new': all_of_news[::-1][number_begin:number_end]}, ensure_ascii=False)  # , encoding='utf-8')
    return HttpResponse(re)


def paper(request):
    number_begin = int(request.GET.get('number_begin', 0))
    number_end = int(request.GET.get('number_end', 20))
    userId = request.GET.get('userID', '')
    paper = Paper.objects.all()
    all_of_paper = []
    for i in paper.values():
        print(i)
        userID = i['userID_id']
        info = Userinfo.objects.filter(id=userID).values()
        i['name'] = info[0]['name']
        i['image'] = info[0]['image']
        i['date'] = str(i['date'])[:10]
        paperid = i['paperID']
        question = agreement.objects.filter(paperID=paperid).values()
        i['agree'] = len(question)
        if userId != '':
            Iagree = agreement.objects.filter(paperID=paperid, userID=userId).values()
            i['Iagree'] = (len(Iagree) > 0)
        all_of_paper.append(i)
    re = json.dumps({'paper': all_of_paper[::-1][number_begin:number_end]}, ensure_ascii=False)  # , encoding='utf-8')
    return HttpResponse(re)


def agree(request):
    userID = request.GET.get('userID', '')
    paperID = request.GET.get('paperID', '')
    print(userID)
    Iagree = agreement.objects.filter(paperID=paperID, userID=userID)
    print(Iagree.values())
    if len(Iagree.values()) > 0:
        Iagree.delete()
        return HttpResponse(False)
    else:
        agreement.objects.create(paperID=Paper.objects.get(paperID=paperID), userID=Userinfo.objects.get(id=userID))
        return HttpResponse(True)




def Score(content):
    return 1


def insertPaper(request):
    userID = request.POST.get('userID', '')
    title = request.POST.get('title', '')
    content = request.POST.get('content', '')
    Paper.objects.create(userID=Userinfo.objects.get(id=userID), paper_content=content, title=title,
                         key_word="; ".join([i[0] for i in jieba.analyse.textrank(content, topK=20, withWeight=True, allowPOS=('ns', 'n', 'vn', 'v')) ]), score=Score(content))
    return HttpResponse(True)


def MyPaper(request):
    userID = request.GET.get('userID', '')
    my_paper = Paper.objects.filter(userID=userID).values()
    all =[]
    info = Userinfo.objects.filter(id=userID).values()
    for p in my_paper:
        p['date'] = str(p['date'])[:10]
        paperid = p['paperID']
        question = agreement.objects.filter(paperID=paperid).values()
        p['agree'] = len(question)
        p['name'] = info[0]['name']
        p['image'] = info[0]['image']
        all.append(p)
    re = json.dumps({'paper': all[::-1]}, ensure_ascii=False)  # , encoding='utf-8')
    return HttpResponse(re)


def DeletePaper(request):
    userID = request.GET.get('userID', '')
    paperID = request.GET.get('paperID', '')
    Paper.objects.filter(paperID=paperID, userID=userID).delete()
    return HttpResponse(True)

def checkRank(request):
    userID = request.GET.get('userID', '')
    rank = Userinfo.objects.order_by('-score').values()
    myrank=  Userinfo.objects.filter(id=userID).values()
    returnrank= []
    print(userID)
    for k,r in enumerate(rank):
        if k >=10:
            break
        returnrank.append(r)
    temp =myrank[0]
    for k,r in enumerate(rank):
        if r['id']==userID:
            temp['index']=k+1
    re = json.dumps({'paper': returnrank,'myrank':temp}, ensure_ascii=False)  # , encoding='utf-8')
    return HttpResponse(re)

def findPaperByKeywords(request):
    keyword = request.GET.get('keyword', '').split(' ')
    userId= request.GET.get('userID', '')
    number_begin = int(request.GET.get('number_begin', 0))
    number_end = int(request.GET.get('number_end', 20))
    s= Q(key_word__icontains=keyword[0])
    for k,w in enumerate(keyword):
        if k>1:
            s= s|Q(key_word__icontains=w)
    paper = Paper.objects.filter(s)
    all_of_paper = []
    for i in paper.values():
        userID = i['userID_id']
        info = Userinfo.objects.filter(id=userID).values()
        i['name'] = info[0]['name']
        i['image'] = info[0]['image']
        i['date'] = str(i['date'])[:10]
        paperid = i['paperID']
        question = agreement.objects.filter(paperID=paperid).values()
        i['agree'] = len(question)
        if userId != '':
            Iagree = agreement.objects.filter(paperID=paperid, userID=userId).values()
            i['Iagree'] = (len(Iagree) > 0)
        all_of_paper.append(i)
    re = json.dumps({'paper': all_of_paper[::-1][number_begin:number_end]},
                        ensure_ascii=False)  # , encoding='utf-8')
    return HttpResponse(re)