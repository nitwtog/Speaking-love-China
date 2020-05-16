from django.contrib import admin

# Register your models here.
from .models import *

class QueConfig(admin.ModelAdmin):
    #定制展示
    list_display = ["index","question","answer"]
    #定制展示跳转
    list_display_links = ["index"]#,"question","answer"]
    #定制过滤�?
    list_filter = ["index"]#, "answer"]
    #模糊搜索
    search_fields = ['question', ]
    # 列表时，可以编辑的列
    list_editable = ['question','answer' ]
    #列表时，对Date和DateTime类型进行搜索
    #date_hierarchy = 'ctime'
admin.site.register(Question,QueConfig)  # 第一个参数可以是元祖

class UserConfig(admin.ModelAdmin):
    #定制展示
    list_display = ["id","score","index"]
    #定制展示跳转
    list_display_links = ["id"]#,"question","answer"]
    #定制过滤�?
    list_filter = ["score"]#, "answer"]
    #模糊搜索
    search_fields = ['id', ]
    #列表时，可以编辑的列
    list_editable = ['score']
    #列表时，对Date和DateTime类型进行搜索
    #date_hierarchy = 'ctime'
admin.site.register(Userinfo,UserConfig)  # 第一个参数可以是元祖

class PaperConfig(admin.ModelAdmin):
    #定制展示
    list_display = ["paperID","userID","title",'date']
    #定制展示跳转
    list_display_links = ["paperID",'title']#,"question","answer"]
    #定制过滤�?
    list_filter = ["paperID",'userID']#, "answer"]
    #模糊搜索
    search_fields = ['paper_content','title' ]
    #列表时，可以编辑的列
   # list_editable = ['question', ]
    #列表时，对Date和DateTime类型进行搜索
    date_hierarchy = 'date'
admin.site.register(Paper,PaperConfig)  # 第一个参数可以是元祖

class agreementConfig(admin.ModelAdmin):
    #定制展示
    list_display = ["paperID","userID",]
    #定制展示跳转
    list_display_links = ["paperID",]#,"question","answer"]
    #定制过滤�?
    list_filter = ["paperID",'userID']#, "answer"]
    #模糊搜索
    search_fields = ['paperID','userID' ]
    #列表时，可以编辑的列
   # list_editable = ['question', ]
    #列表时，对Date和DateTime类型进行搜索
    #date_hierarchy = 'ctime'
admin.site.register(agreement,agreementConfig)  # 第一个参数可以是元祖

class NewsConfig(admin.ModelAdmin):
    #定制展示
    list_display = ["id","paper_content",'title','date','type']
    #定制展示跳转
    list_display_links = ["paper_content",'type']#,"question","answer"]
    #定制过滤�?
    list_filter = ["title",'paper_content','type']#, "answer"]
    #模糊搜索
    search_fields = ['paper_content','title','type']
    #列表时，可以编辑的列
   # list_editable = ['question', ]
   #  列表时，对Date和DateTime类型进行搜索
    date_hierarchy = 'date'
admin.site.register(News,NewsConfig)  # 第一个参数可以是元祖

class eqConfig(admin.ModelAdmin):
    #定制展示
    list_display = ["userID","index"]
    #定制展示跳转
    list_display_links = ["userID",'index']#,"question","answer"]
    #定制过滤�?
    list_filter = ["userID",'index']#, "answer"]
    #模糊搜索
    search_fields = ["userID",'index']
admin.site.register(errorQuestion,eqConfig)  # 第一个参数可以是元祖
