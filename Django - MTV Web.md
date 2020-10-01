# Django Project 정리



[TOC]



### 1. project 시작

1. `django-admin startproject project_name`
2. `git init`, `.gitignore` 관리, `gitignore.io`에서 `python, windows, django, 에디터(cloud9, visualstudiocode)` 등록
3. 최초커밋 남겨주기. `git add .`, `git commit -m "Initial commit"` 등 
4. `python manage.py startapp app_name`





#### (1) project/setting.py 수정

```python
ALLOWED_HOSTS = ['*']
INSTALLED_APPS = [
    'community',
]
TEMPLATES = [
    {        
        'DIRS': [os.path.join(BASE_DIR, 'django_pjt1', 'templates')],
    }
]
```





#### (2) model & migrate

```python
# app/models.py
from django.db import models

class Review(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    # 만약 이미 작성중인 DB에 새로운 field를 추가한다면
    # 1. 터미널에서 default값을 넣어주기
    # 2. models.py에서 직접 수정하기
    # 3. migrations/__init__제외한 파일들, db.sqlite 파일 삭제하고 다시 migrate하기 (현재DB초기화)
    # content = models.TextField(default='')
    rank = models.IntegerField()  # 숫자만 입력 가능
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

`python manage.py makemigrations` : model을 `commit`한다 

`python manage.py showmigrations` : model의 `status` 확인

`python manage.py migrate` : model을 `push`한다





#### (3) admin 등록하기

```bash
$ python manage.py createsuperuser
사용자 이름 (leave blank to use 'ubuntu'): admin1
이메일 주소:
Password:
Password (again):
Superuser created successfully.
```


   ```python
# admin.py
from django.contrib import admin
from .models import Article


# 기존방법
admin.site.register(Article)


# 표 향식으로 admin 페이지 구성
@ admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'content']
   ```

   







#### (4) urls.py 수정

```python
# project/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('community/', include('community.urls')),
    path('admin/', admin.site.urls),
]


# app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('new_review/', views.new_review),
    path('create_review/', views.create_review),
    path('review_detail/<int:review_pk>/', views.review_detail),
    ]
```





#### (5) app/views 수정

```python
from django.shortcuts import render, redirect
from .models import Review


def index(request):
    reviews = Review.objects.all()
    context = {
        'reviews' : reviews
    }
    return render(request, 'community/index.html', context)


def new_review(request):
    return render(request, 'community/new_review.html')


def create_review(request):
    review = Review()
    review.title = request.GET.get('title')
    review.content = request.GET.get('content')
    review.rank = request.GET.get('rank')
    review.save()
    return redirect('/community/')


def review_detail(request, review_pk):
    review = Review.objects.get(id=review_pk)  
    context = {
        'review' : review
    }
    return render(request, 'community/review_detail.html', context)
```





#### (6) templates 만들어주기

```html
<!--project/templates/base.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{% block title%}{% endblock %}</title>
</head>
<body>
    <h1>Review Community Site</h1>
    <hr>
    {% block content %}
    {% endblock %}
</body>
</html>


<!--app/templates/app/index.html-->
{% extends 'base.html' %}
{% block title %}
Review_index
{% endblock %}
{% block content %}
<h1>Review 목록</h1>
<br>
<a href="/community/new_review/">새로운 리뷰 작성</a><br>
<ol>
    {% for review in reviews %}
    <li><a href="/community/review_detail/{{ review.id }}/"><h4>리뷰 제목 : {{ review.title }}</h4></a></li>
    <h5>평점 : {{ review.rank }}</h5>
    <p>내용 : {{ review.content }}</p>
    <br>
    {% endfor %}
</ol>
{% endblock %}


<!--community/templates/community/new_review.html-->
{% extends 'base.html' %}
{% block title %}
new_review
{% endblock %}
{% block content %}
<h1>새로운 Review 작성</h1>
<form action="/community/create_review/">
    게시글 제목 : <input type="text" name="title"><br>
    평점 : <input type="number" name="rank"><br>
    게시글 내용 :<input type="textarea" name="content"><br>
    <input type="submit" value="작성완료"><br>
</form>
<a href="/community/">Back</a>
{% endblock %}



<!--community/templates/community/review_detail.html-->
{% extends 'base.html' %}
{% block title %}
review_detail {{ review.id }}
{% endblock %}
{% block content %}
<h3>리뷰 제목 : {{ review.title }}</h3>
<p>작성시간 : {{ review.created_at }}</p>
<p>수정시간 : {{ review.updated_at }}</p>
<h5>평점 : {{ review.rank }}</h5><br>
<p>내용 : {{ review.content }}</p>
<a href="/community/">Back</a>
{% endblock %}


```









### 2. CRUD: 수정/ 삭제 만들기



#### (1) app/urls.py

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('new/', views.new),
    path('create/', views.create),
    path('<int:article_pk>/', views.detail),
    
    # 해당 부분 추가.
    path('<int:article_pk>/edit/', views.edit),
    path('<int:article_pk>/update/', views.update),
    path('<int:article_pk>/delete/', views.delete),
    ]
```





#### (2) app/views.py

```python
from django.shortcuts import render, redirect
from .models import Article

# 기존에 저장되어있는 데이터를 불러와 표시
def edit(request, article_pk):
    article = Article.objects.get(id=article_pk)
    context = {
        'article': article,
    }
    return render(request, 'articles/edit.html', context)

# create와 같이 수정만을 위한 함수. 수정할 데이터를 직접 불러와 덮어씌움(새로저장)
def update(request, article_pk):
    article = Article.objects.get(id=article_pk)
    article.title = request.GET.get('title')
    article.content = request.GET.get('content')
    article.save()
    return redirect(f'/articles/{article_pk}/')

# create와 같이 삭제만을 위한 함수. 삭제할 데이터를 직접 불러와 delete()
def delete(request, article_pk):
    article = Article.objects.get(id=article_pk)
    article.delete()
    return redirect('/articles/')
```



#### (3) app/templates/app/edit.html

```html
{% extends 'base.html' %}

{% block content %}

<h1>EDIT</h1>

<!--create와 같이 update로 action 보내기-->
<form action="/articles/{{ article.id }}/update/">
    <!--value="{{ article.artibute }}"를 통해 이전 내용을 불러올 수 있음-->
    TITLE: <input type="text" name="title" value="{{ article.title }}"><br>
    CONTENT: <input type="textarea" name="content" value="{{ article.content }}"><br>
    <input type="submit" value="수정">
</form>

<a href="/articles/{{ article.id }}">BACK</a>

{% endblock %}
```









### 3. app_name을 이용한  url 일괄 활용하기





#### (1) articles/urls.py

```python
from django.urls import path
from . import views

# 중요. app_name 설정
# 다른앱에서 url이름이 중복되도 사용할 수 있음
app_name = 'articles'


# /articles/
urlpatterns = [
    # name속성을 부여해준다. 
    path('', views.index, name="index"),
    path('new/', views.new, name="new"),
    path('create/', views.create, name="create"),
    path('<int:article_pk>/', views.detail, name="detail"),
    path('<int:article_pk>/edit/', views.edit, name="edit"),
    path('<int:article_pk>/update/', views.update, name="update"),
    path('<int:article_pk>/delete/', views.delete, name="delete"),
]
```





#### (2) articles/views.py

```python
# redirect가 필요한 부분들에 대하여 수정
# redirect('app_name:url_name')

def create(request):
    article = Article()
    article.title = request.POST.get('title') # POST방식으로 수정
    article.content = request.POST.get('content')
    article.save()
    return redirect('articles:index')


def update(request, article_pk):
    article = Article.objects.get(id=article_pk)
    article.title = request.POST.get('title')
    article.content = request.POST.get('content')
    article.save()
    return redirect('articles:detail', article.pk)
    # 베리어블라우팅 할 시 함수의 두번째 인자로 넘겨야 함


def delete(request, article_pk):
    article = Article.objects.get(id=article_pk)
    article.delete()
    return redirect('articles:index')
```





#### (3) 각 html 파일 url 설정

`{% url 'app_name:url_name' 변수1 변수2 ... %}`

>index : `/articles/` ==> `{% url 'articles:index' %}`
>
>new : `/articles/new/` ==> `{% url 'articles:new' %}`
>
>create : `/articles/create/` ==> `{% url 'articles:create' %}`
>
>detail : `/articles/{{ article.pk }}/` ==> `{% url 'articles:detail' article.pk %}`
>
>edit : `/articles/{{ article.pk }}/edit/` ==> `{% url 'articles:edit' article.pk %}`
>
>update : `/articles/{{ article.pk }}/update/` ==> `{% url 'articles:update' article.pk %}`
>
>delete : `/articles/{{ article.pk }}/delete/` ==> `{% url 'articles:delete' article.pk %}`





#### (4) GET방식에서 POST방식으로 변경 :star:

```html
<form action="" method="post">
    {% csrf_token %} 
    <!--{% csrf_token %}은 form태그 안에 넣을 것-->
    ...
</form>
```

```python
def create(request):
    article = Article()
    article.title = request.POST.get('title') # POST방식으로 수정
    article.content = request.POST.get('content')
    article.save()
    return redirect('articles:index')
```







### 4. forms.ModelForm을 상속받아 form 만들기

> forms.ModelForm에 이미 만들어​​진 form을 상속받아 쉽게 만들기

#### (1) form.py

```python
from django import forms
from .models import Article

# form.ModelForm 상속받기
class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article  				# models.py에 설정한 model 사용
        fields = ['title', 'content']   # form으로 받을 정보들 
        								# '__all__' 사용가능
```





#### (2) GET방식 & POST방식 & get_object_or_404 응용하기:star:

>create를 하나로 통합하여, GET방식과 POST방식으로 요청이 들어올 때 따로 적용할 수 있게 한다. 

##### views.py

```python
from django.shortcuts import render, redirect, get_object_or_404
from .models import Article
from .forms import ArticleForm

# Create your views here.

def index(request):
    articles = Article.objects.order_by('-pk')  # 게시글 순서 바꾸기
    context = {
        'articles': articles
    }
    return render(request, 'articles/index.html', context)


def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save()
            return redirect('articles:index')
    else:  # GET방식
        form = ArticleForm()
    context = {  		# is_vaild()에 걸리지 않으면, 잘못된 form 정보를 가지고 
        'form': form	# context로 내려온다. 이후 페이지에 출력해준다. 
    }
    return render(request, 'articles/new.html', context)


def detail(request, pk):
    article = get_object_or_404(Article, pk=pk)
    context = {
        'article': article
    }
    return render(request, 'articles/detail.html', context)
```





#### (3) 응용하여 update & delete만들기

```python
from django.shortcuts import render, redirect, get_object_or_404
# delete에서 꼭 POST방식으로만 작동할 수 있도록.
from django.views.decorators.http import require_POST

from .models import Article
from .forms import ArticleForm


def update(request, pk):
    article = get_object_or_404(Article, pk=pk)
    if request.method == 'POST':
        # form에서 정보를 불러올때는 instance사용, 기존의 정보를 인자로 활용한다는 의미인 듯
        form = ArticleForm(request.POST, instance=article)
        if form.is_valid():
            article = form.save()
            return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm(instance=article)
    context = {
        'form': form
    }
    return render(request, 'articles/form.html', context)


# POST방식으로만 delete를 사용하기 위해 붙임
@require_POST
def delete(request, pk):
    article = get_object_or_404(Article, pk=pk)
    article.delete()
    return redirect('articles:index')

```





#### (4) detail.html

```html
{% extends 'base.html' %}

{% block content %}

<h1>DETAIL</h1>

<h2>{{ article.title }}</h2>
<p>{{ article.content }}</p>
<p>작성일: {{ article.created_at }}</p>
<p>수정일: {{ article.updated_at }}</p>

<!--GET방식은 a태그도 가능-->
<a href="{% url 'articles:update' article.pk %}">EDIT</a><br>

<!--html에서 POST요청은 form만 가능. 삭제를 위해서 post요청-->
<form action="{% url 'articles:delete' article.pk %}" method="POST">
    {% csrf_token %}
    <button>DELETE</button>
</form>

<a href="{% url 'articles:index' %}">BACK</a>

{% endblock %}
```







#### (5) form.html 분기하기 :star:

```html
{% extends 'base.html' %}

{% block content %}
    {% if request.resolver_match.url_name == 'create' %} <!--url_name에 따라 분기-->
        <h2>NEW</h2>

    {% else %}
        <h2>EDIT</h2>

    {% endif %}
    <form action="" method="post"> <!--action이 ""이면, 본인과 같은 url에 요청을 보낸다.-->
        {% csrf_token %}  <!--form태그 안에 넣어야 함-->
        {{ form.as_p }}
        <input type="submit" value="작성">
    </form>

    <a href="{% url 'articles:index' %}">BACK</a>

{% endblock %}
```







### 5. Alert(message, widget) & Admin page









### 6. 로그인 기능 구현하기:star::star:



#### (1) UserCreationForm으로 회원가입 구현하기

> 회원가입 form은 직접 만들지 않음. django에서 지원하는 회원가입 form인 `UserCreationForm`을 활용한다. `migrate`는 필수
>
> user 정보를 불러올 때는 `User = get_user_model()`을 통해 불러옴

```python
# 회원가입/views.py

from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

def index(request):
    # 게시글을 불러올 때, Article model를 불러오듯
    # User 정보를 불러올때는 get_user_model()를 사용한다.
    User = get_user_model()
    users = User.objects.all()
    context = {
        'users': users,
    }
    return render(request, 'accounts/index.html', context)


def signup(request):
    if request.method == 'POST':
        # django에서 제공하는 UserCreationForm 사용
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('accounts:index')
    else:
        form = UserCreationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)
```





#### (2) AuthenticationForm, login, logout 이용하기

> 로그인은 AuthenticationForm을 이용한다. UserCreationForm과 다르게 상속받는 class도 다르며, 받는 인자의 개수도 다르다. UserCreationForm(forms.ModelForm 상속) / AuthenticationForm(forms.Form 상속), AuthenticationForm은 세션에 정보를 저장하기 위한 form이기 때문이다. request인자를 처음으로 받아야 한다. 
>
> login, logout을 alias를 사용하는데, django에서 기본적으로 `/accounts/login/`이 default 기본적인 login url이기 때문에, 그대로 사용해주면 좋다. 만약 다르게 사용하고 싶다면, settings.py 에서 `LOGIN_URL = '/accounts/signin/'` 등으로 바꿔준다. 
>

```python
# views.py

from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model
# login, logout은 내장 함수를 사용한다. 우리가 구현하고자 하는 이름이랑 겹치므로, alias를 사용하여 이름을 변경해준다. 
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout


def index(request):
    User = get_user_model()
    users = User.objects.all()
    context = {
        'users': users,
    }
    return render(request, 'accounts/index.html', context)

# 회원가입 성공시 login 기능 추가
def register(request):
    if request.method == 'POST':
        # 회원가입은 UserCreationForm
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # 받는 인자는 request와 user정보
            auth_login(request, user)
            return redirect('accounts:index')
    else:
        form = UserCreationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/register.html', context)


def login(request):  # signin으로 하면 alias사용 안해도 됨
    if request.method == 'POST':
        # AuthenticationForm은 받는 인자가 2개. request, request.POST
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            # get_user는 AuthenticationForm의 메서드로, self.user_cache를 return한다. 
            user = form.get_user()  
            auth_login(request, user)
            return redirect('accounts:index')
    else:
        form = AuthenticationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/login.html', context)


def logout(request):  # signin으로 하면 alias사용 안해도 됨
    auth_logout(request)  # logout은 받는인자 1개. request
    return redirect('accounts:index')

```





#### (3) 로그인 시 html 분기하기

> `{% if user.is_authenticated %}`를 사용해서 분기 가능. 

**base.html**

```html
​```
{% if user.is_authenticated %}
    <li class="nav-item">
        <a class="nav-link" href="#">{{ user.username }}님 환영합니다!</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="{% url 'accounts:logout' %}">logout</a>
    </li>
{% else %}
    <li class="nav-item">
        <a class="nav-link" href="{% url 'accounts:login' %}">login</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="{% url 'accounts:register' %}">register</a>
    </li>
{% endif %}
​```
```





#### (4) @login_required, is_authentication

> `@login_required ` : 로그인이 되어 있어야만 실행할 수 있게 하는 decorator
>
> `is_authentication` : 인증된 사용자인지 확인 가능하게 함

**views.py**

```python
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
# require_POST랑 같이 decorator로 활용
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.views.decorators.http import require_POST


def signup(request):
    if request.user.is_authenticated:  # 로그인이 되어있는데, 회원가입 시도를 할 경우
        return redirect('articles:index')

    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('articles:index')  # 게시글 목록 페이지
    else:
        form = UserCreationForm()
    context = {
        'form': form,  # trailing comma 필수
    }
    return render(request, 'accounts/signup.html', context)

def detail(request, pk):  # 유저 detail
    User = get_user_model()
    user = get_object_or_404(User, pk=pk)
    context = {
        'user': user,
    }
    return render(request, 'accounts/detail.html', context)

def login(request):
    if request.user.is_authenticated:  # 로그인이 되어있는데, 로그인 시도를 할 경우
        return redirect('articles:index')
    if request.method == 'POST':
        # 사용자가 보낸 값 -> form
        form = AuthenticationForm(request, request.POST)
        # 검증
        if form.is_valid():
            # 검증 완료시 로그인!
            auth_login(request, form.get_user())
            return redirect(request.GET.get('next') or 'articles:index')
    else:
        form = AuthenticationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/login.html', context)

@login_required
def logout(request):
    # 조건식으로 직접 작성 해도 된다.
    auth_logout(request)
    return redirect('articles:index')
```





#### (5) 회원정보 수정, form 커스터마이징



**forms.py**

```python
# 회원가입에서는 from django import forms는 활용하지 않음. 게시판에 활용하는 forms를 상속받지 않기 때문.
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserChangeForm

# 그대로 활용하지 못하는 경우는 항상 상속받아서 custom!!!!
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = get_user_model()
        fields = ['username', 'first_name', 'last_name', 'email']

```



**views.py (이어서)**

```python
from .forms import CustomUserChangeForm

# 회원정보 수정
def update(request):
    if request.method == 'POST':
        # request.user는 user가 이미 로그인되어있다면 사용 가능, user정보 return
        form = CustomUserChangeForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('articles:index')
    else:
        form = CustomUserChangeForm(instance=request.user)
    context = {
        'form': form
    }
    return render(request, 'accounts/update.html', context)

# 회원 탈퇴
@require_POST
@login_required
def delete(request):
    request.user.delete()
    return redirect('articles:index')
```



**detail.html**

> 회원정보 수정, 회원탈퇴는 본인만이 사용할 수 있게 해야하므로 `{% if request.user == user %}`를 하용하여 사용자가 본인임을 검증한다. 

```python
{% extends 'base.html' %}

{% block body %}
<h1>{{ user.pk }} : {{ user.username }}</h1>
{% if request.user == user %}
    <a href="{% url 'accounts:update' %}">회원 수정</a>
    <form action="{% url 'accounts:delete' %}" method="POST">
        {% csrf_token %}
        <button class="btn btn-secondary">회원 탈퇴</button>
    </form>
{% endif %}
<hr>
{% endblock %}
```









### 7. 1:N 관계로 유저 & 게시글 & 댓글 연결관계 DB 구현,  댓글 작성 & 삭제 구현하기:star:



#### (1)  ForeingKey & on_delete :star::star:

> 1:N 으로 연결된 기능(회원-게시물, 게시물-댓글)의 경우 N에 대응하는 model을 정의할 때, `models.ForeignKey`를 이용하여 1에 대응하는 field를 넣어준다. 이를 통해 1에 대응하는 속성에서 `field`, `model_set`, `model_id` 등 N에 대응하는 속성을 불러올 수 있다. 
>
> - 1 -> N 조회는 `1_model.N_model_set`으로, N -> 1 조회는 `N_model.1_model_id`로 사용.
>
> - `models.ForeignKey(N대응 객체, on_delete=models.속성)`으로 활용한다. `on_delete`는 1에 대응하는 데이터가 삭제되었을 때, N에 대응하는 데이터들의 처리방법
> - CASCADE : 1대응에 해당되는 ForeignKey를 가지고 있는 모든 N대응 데이터들을 지운다. 
>   
> - PROTECT : 삭제를 못하게 에러를 내보낸다.
>   
> - SET_NULL : 삭제된 ForeignKey를 null로 바꾼다.
>   
> - SET_DEFAULT : 삭제된 ForeignKey를 지정해둔 default value로 바꾼다.
>   
> - SET() : 잘 모르겠음..
>   
> - DO_NOTHING : 아무행동도 하지 않음

##### model.py

> model이 변경되었기 때문에 migrate 다시 해줄 것.

```python
from django.db import models
from django.conf import settings


class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # 1(User):N(Article)
    # User의 경우에는 settings.AUTH_USER_MODEL을 통해 객체를 불러온다.
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
	
    
class Comment(models.Model):
    content = models.TextField()
    # 1(Article):N(Comment)
    article = models.ForeignKey(Article,on_delete=models.CASCADE)
    # 대응관계 모두 넣어줄 것
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)

```



##### forms.py

```python
from django import forms
from .models import Article, Comment


class ArticleForm(forms.ModelForm):
    class Meta:
        model = Article
        fields = ['title', 'content']
        # fields = '__all__'를 사용하게 되면 user field까지 받아오게됨. 필요한것만 가져다쓰기
        # exclude = ['title']
        

# comment를 위한 form 만들어주기
class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']
```





#### (2)  댓글 작성 & 삭제 구현하기



##### urls.py(추가)

```python
urlpatterns = [
    # 댓글을 작성하는 url
    path('<int:article_pk>/comments/', views.comments_create, name='comments_create'),
    # 댓글을 삭제하는 url
    path('<int:article_pk>/comments/<int:comment_pk>/delete', views.comments_delete, name='comments_delete')
]
```



##### views.py(추가):star:

```python
from .models import Article, Comment
from .forms import ArticleForm, CommentForm  # 새로 추가된 CommentForm


def detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    comment_form = CommentForm()
    comments = article.comment_set.all()  # 1:N관계, class_set으로 표시해줄 댓글 데이터 받기
    context = {
        'article': article,
        'comment_form': comment_form,
        'comments': comments,
    }
    return render(request, 'articles/detail.html', context)


@require_POST
@login_required
def comments_create(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    form = CommentForm(request.POST)
    if form.is_valid():
		comment = form.save(commit=False)  # save()시, query_set을 반환하지 않게 함.
        comment.user = request.user 	   # 1:N을 위해 추가된 field를 다 넣어줘야 함.
        comment.article = article
	    comment.save()
    return redirect('articles:detail', article_pk)


@require_POST
@login_required
def comments_delete(request, article_pk, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    comment.delete()
    return redirect('articles:detail', article_pk)
```



##### detail.html(추가)

```html
<!--댓글 구현부. 댓글 작성, 삭제 모두 POST요청으로 보내기-->

<h3>댓글</h3><hr>
{% for comment in comments %}
	<h5>{{ comment.content }}</h5>
	<p>수정시간 : {{ comment.updated_at}}</p>
	<form action="{% url 'articles:comments_delete' article.pk comment.pk %}", method="POST">
        {% csrf_token %}
        <button>댓글 삭제</button>
	</form><hr>
{% endfor %}

<form action="{% url 'articles:comments_create' article.pk %}" method="POST">
    {% csrf_token %}
    {{ comment_form.as_p }}
    <button>댓글 작성</button>
</form>
```









## :bulb:현재까지 정리



### 중요 & 어려운 부분:star::star::star:

1. `on_delete` 설정은 `on_delete=models.속성`
2. 현재 요청을 보내는 유저를 확인하는 방법 `request.user`
3. 사용자가 로그인 되어있는지 확인하는 함수 `is_authenticated`
   DTL로 하면 `{% if request.user.is_authenticated %}`
4. 게시글과 댓글 등 각 사용자를 확인하는 방법 `review.user` `comment.user`
   DTL로 하면 `{% if request.user == review.user %}`, `{% if request.user == comment.user %}`
5. `UserCreationForm`은 1개 인자 `request`, `AuthenticationForm`은 2개인자 `request`, `request.POST`
6. `auth_login`은 2개 인자 `request`, `form.get_user()`, `auth_logout`은 1개 인자 `request`
7. 로그인 후 다음행동을 하게 할 때 `redirect(request.GET.get('next') or 'url_name')`
8. `save(commit=False)`를 통해 ForeignKey field에 정보를 넣어줌. 
9. 1 -> N 으로 데이터를 조회할 때는 `1_model.N_model_set.all()`, N - > 1으로 데이터를 조회할 때는 `N_model.1_model_id` 
10. `if request.method == 'POST'`문을 통하며 받은 정보는 대부분 form 등에 넘겨줄 때 `request.POST`로 넘겨줄 것







### 구현 과정:star:



#### (1) community/models.py : 모델설정

```python
from django.db import models
from django.conf import settings


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    movie_title = models.CharField(max_length=30)
    rank = models.IntegerField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    review = models.ForeignKey(Review, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```



#### (2) community/forms.py : 폼 설정

```python
from django import forms
from .models import Review, Comment


class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['title', 'movie_title', 'rank', 'content']


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']
```



#### (3) accounts/views.py : 로그인, 로그아웃 구현

```python
from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import get_user_model

from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required


def signup(request):
    if request.user.is_authenticated:
        return redirect('community:index')
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('community:index')
    else:
        form = UserCreationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)


def login(request):
    if request.user.is_authenticated:
        return redirect('community:index')
    if request.method == 'POST':
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            auth_login(request, form.get_user())
            return redirect(request.GET.get('next') or 'community:index')
    else:
        form = AuthenticationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/login.html', context)


@login_required
def logout(request):
    auth_logout(request)
    return redirect('community:index')
```



#### (4) community/views.py : 커뮤니티 구현

```python
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.http import require_POST
from .models import Review, Comment
from .forms import ReviewForm, CommentForm


def index(request):
    reviews = Review.objects.order_by('-pk')
    context = {
        'reviews': reviews,
    }
    return render(request, 'community/review_list.html', context)


@login_required
def create(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.user = request.user
            review.save()
            return redirect('community:detail', review.pk)
    else:
        form = ReviewForm()
    context = {
        'form': form,
    }
    return render(request, 'community/form.html', context)


def detail(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    comment_form = CommentForm()
    comments = review.comment_set.all()
    context = {
        'review': review,
        'comment_form': comment_form,
        'comments': comments,
    }
    return render(request, 'community/review_detail.html', context)


def update(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == 'POST':
        form = ReviewForm(request.POST, instance=review)
        if form.is_valid():
            form.save()
            return redirect('community:detail', review.pk)
    else:
        form = ReviewForm(instance=review)
    context = {
        'form': form,
    }
    return render(request, 'community/form.html', context)


@login_required
@require_POST
def delete(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.user != review.user:
        return redirect('community:detail', review.pk)
    else:
        review.delete()
        return redirect('community:index')


@login_required
@require_POST
def comments(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    form = CommentForm(request.POST)
    if form.is_valid():
        comment = form.save(commit=False)
        comment.user = request.user
        comment.review = review
        comment.save()
    return redirect('community:detail', review_pk)


@login_required
@require_POST
def comments_delete(request, review_pk, comments_pk):
    comment = get_object_or_404(Comment, pk=comments_pk)
    comment.delete()
    return redirect('community:detail', review_pk)
```



#### (5) community/review_detail.html : 댓글기능 구현

```html
{% extends 'base.html' %}
	
{% block content %}

    <h2>리뷰 상세페이지</h2>
    <p>{{ review.pk }}번 리뷰</p>
    <h2>{{ review.title }}</h2>
    <h3>{{ review.movie_title }}</h3>
    <p>{{ review.content }}</p>
    <p>별점: {{ review.rank }}</p>
    <hr>
    <p>작성자: {{ review.user }}</p>
    <p>작성 시간: {{ review.created_at }}</p>
    <p>수정 시간: {{ review.updated_at }}</p>
    {% if request.user == review.user %}
        <form action="{% url 'community:delete' review.pk %}" method='POST'>
            {% csrf_token %}
            <button>삭제</button>
        </form>
        <a href="{% url 'community:update' review.pk %}">수정</a>
    {% endif %}
    <a href="{% url 'community:index' %}">뒤로가기</a><hr>

    <h3>댓글</h3><hr>
    {% if request.user.is_authenticated %}
        <form action="{% url 'community:comments' review.pk %}" method="POST">
            {% csrf_token %}
            {{ comment_form.as_p }}
            <button>댓글 달기</button>
        </form>
    <hr><br>
    {% endif %}

    {% for comment in comments %}
        <p>{{ comment.content }}</p>
        {% if request.user == comment.user %}
            <form action="{% url 'community:comments_delete' review.pk comment.pk %}" method="POST">
                {% csrf_token %}
                <button>댓글 삭제</button>
            </form>
        {% endif %}
    {% endfor %}

{% endblock %}
```



#### (6) static 파일 관리 :bulb::bulb::bulb:

```python
# settings.py 

STARIC_URL = '/static/' # static파일이 들어가야하는 경로

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, "static"), # Root의 static 폴더
    '/앱이름/static/',	# 각 App의 static 폴더
    # 요청한 static 파일을 위에 설정한 경로 순서대로 찾게된다.
)
```

```html
{% load static %}
<!-- css 예시 -->
<link rel="stylesheet" href="{% static '앱이름/style.css' %}">
```









### import 요소들 정리:star::star::star:

```python
# urls.py
from django.urls import path, include
from . import views

# models.py
from django.db import models
from django.conf import settings

# forms.py
from django import forms
from .models import Review, Comment

# accounts/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.decorators import login_required

# community/views.py
from .models import Review, Comment
from .forms import ReviewForm, CommentForm
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.http import require_POST
```









### 8. 이미지 업로드 구현하기:star:

> 이미지는 `media/`라는 폴더에 저장됨



#### (1) image field 넣어주기

> 단순 ImageField를 활용하기 위해서는 pillow 패키지가 반드시 필요하다.

```bash
$ pip install pillow
```

```python
# models.py
image = models.ImageField()	 # model에 field 추가해주기


# forms.py
fields = ['title', 'content', 'image']  # form에도 field에 추가해주기
	''''''
```



#### (2)  요청 FILES도 받게하기

```python
# views.py
def create(request):
    if request.method == 'POST':
        form = ReviewForm(request.POST, request.FILES) 
        # 이미지는 POST가 아닌 FILES이기 때문에 request.FILES를 받아와야 한다. 
        if form.is_valid():
```



#### (3) 업로드 form : enctype="multipart/form-data" 설정

> https://docs.djangoproject.com/en/3.0/topics/http/file-uploads/

```html
<form action="{% url 'community:delete' review.pk %}" method='POST' enctype="multipart/form-data">  
    {% csrf_token %}
    {% form.as_p%}
    <button>완료</button>
</form>
enctype="multipart/form-data"
```



#### (4) html: `<img>` 태그 설정

> https://docs.djangoproject.com/en/3.0/topics/files/

```html
<!-- detail.html -->

<img src="{{ article.image.url }}" alt="">
<!-- article.image 까지 불러오면 객체를 불러오는 것. 
저장 경로를 불러와야 하기 때문에 .url을 붙어야 함 -->
```



#### (5) MEDIA_ROOT, MEDIA_URL 

> https://docs.djangoproject.com/en/3.0/ref/settings/#std:setting-MEDIA_ROOT
>
> https://docs.djangoproject.com/en/3.0/topics/files/#managing-files

```python
# settings.py 맨 아래 작성

# Media files
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')  # 저장하기 위한 root경로
MEDIA_URL = '/media/'  # 사용자가 우리 컴퓨터가 가지고 있는 resource에 접근하기 위해서는 경로가 필요하다. ex) '~/media/img1.png'
```



#### (6) urls.py에서 MEDIA_URL, MEDIA_ROOT 설정해주기

>https://docs.djangoproject.com/en/3.0/howto/static-files/#serving-static-files-during-development

```python
# project의 urls.py, app아님

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
	''''''
] + static(settings.MEDIA_URL, document_root=settings.MDEIA_ROOT)
# 이미지에 대한 url을 django에게 등록하여 준다. 
# ssafy.com + /media/ + bonobono.jpg
```



####  + (7) 썸네일(resizing)

>  Resizing을 위해서는 pilkit, django-imagekit 패키지가 필요하다.

```bash
$ pip install pilkit django-imagekit
```







### 9. M:N 관계로 좋아요&팔로우 기능 구현하기:star:





#### (1) 중개 모델 활용

> - M:N 관계를 구현하기 위하여 양방향 데이터를 담을 새로운 table을 만들어 사용한다. 새로운 테이블은 `doctor_id`, `patient_id`를 컬럼으로 가지며, 참조값 이외에 다른 데이터를 넣고싶은 경우에 주로 사용한다.
> - 아래의 예시에서는 `Doctor`는 `Reservation`을 거쳐 `Patient`를 `_set`을 이용하여 역참조, `Patient`는 `Reservation`을 거쳐 `Doctor`를 직접참조

```python
class Doctor(models.Model):
    name = models.CharField(max_length=10)

class Patient(models.Model):
    name = models.CharField(max_length=10)
    # M:N 필드! reservation 통해서, Doctor에 접근을 의미
    doctors = models.ManyToManyField(Doctor, 
                                    through='Reservation',
                                    related_name='patients')

class Reservation(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

```



#### (2) 중개 모델 없이 ManyToManyField만 이용

> 좋아요나 팔로우 같이 다른 데이터의 저장이 필요 없는 경우에는 중개모델이 필요 없다. `ManyToManyField`를 사용하여 '필드명'과 `related_name` 등 서로 참조할 이름을 만들어 주면 양방향 참조가 가능하다. 
>
> `user.like_articles.all()`, `article.like_users.all()` 등

```python
# article/models.py

from django.db import models
from django.conf import settings

class Article(models.Model):
    '''중략'''
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_articles')
```



#### (3) 좋아요 기능 구현하기

```python
# article/urls.py

urlpatterns = [
    '''중략'''
    path('<int:article_pk>/like/', views.like, name='like'),
]
```
```python
# article/views.py

@login_required
def like(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    user = request.user
    # 만약에 좋아요를 눌렀다면 == article의 like_users에 현재 유저가 존재한다면
    if article.like_users.filter(pk=user.pk).exists():
        # 좋아요 취소하기
        article.like_users.remove(user)
    # 누르지 않았다면
    else:
        # 좋아요 누르기
        article.like_users.add(user)
    return redirect('articles:index')
```

```html
<!-- articles/index.html -->
<a href="{% url 'articles:like' article.pk %}">
    <!-- user와 request.user는 같이 활용 가능. 장고의 편의기능 중 하나 -->
    {% if user in article.like_users.all %}  
    <!-- user가 article.like_users.all에 있다면 -->
    좋아요 취소
    {% else %}
    좋아요
    {% endif %}
</a>
<p>{{ article.like_users.count }}명이 좋아합니다.</p>
```



#### (4) :bulb:필수적으로 User모델 변경하기

> 서비스를 구축하다가 User모델을 변경하게 되면 매우 번거롭다. 그렇기 때문에 시스템 시작 시 미리 User모델을 쉽게 변경 가능하게 바꿔놓는다. 팔로우 기능들을 사용하게 되면 User모델을 바꿔야 하기 때문

```python
# accounts/models.py
# User모델을 활용여부를 떠나서 기본적으로 User모델을 설정해주자.

from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass
```

```python
# settings.py

'''최하단부'''

# AUTH_USER_MODEL을 참조할 위치를 설정해준다.
# User Model
AUTH_USER_MODEL = 'accounts.User'
```



#### (5) User모델, UserCreationForm, UserChangeFrom 변경하기

> - 팔로잉 기능을 위해서 각 follower, followee관계를 만들어야 한다. `ManyToManyField`를 이용하여 참조할 수 있게 만들어준다.
> - User모델을 바꿔주었기때문에, form의 model도 변경해주어야 한다. User모델을 상속받는 `UserCreationForm`, `UserChangeForm`의 경우에는 상속받는 `model` 속성을 우리가 설정한 User모델로 변경해줘야 한다. `AuthenticationForm`의 경우에는 User모델을 상속받지 않는다. 따라서 수정해주지 않아도 된다.
```python
# accounts/models.py

from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


class User(AbstractUser): # 팔로잉 기능을 위해서 각 follower, followee관계
    followers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="followings")
```

```python
# accounts/forms.py

from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth import get_user_model
# get_user_model은 AUTH_USER_MODEL을 가져오는데, settings.py에 'accounts.User'로 설정하였기 때문에 User모델을 가져온다.


class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta): # UserCreationForm의 Meta속성만 상속
        model = get_user_model()
        # fields 설정 안하면 기존의 UserCreationForm의 field를 사용
        
        
class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = get_user_model()
        
# AuthenticationForm의 경우에는 User모델을 상속받지 않는다. 따라서 수정해주지 않아도 된다.
```



#### (6) 팔로우 기능 구현하기



```python
# accounts/urls.py

urlpatterns = [
   '''중략'''
    path('<username>/', views.profile, name='profile'), # 개인 프로필 페이지
    path('<username>/follow/', views.follow, name='follow'), # 팔로우 기능 
]
```

```python
# accouts/views.py

from .forms import CustomUserCreationForm
from django.contrib.auth import get_user_model


def profile(request, username):
    User = get_user_model()
    person = get_object_or_404(User, username=username)
    context = {
        'person': person
    }
    return render(request, 'accounts/profile.html', context)


@login_required
def follow(request, username):
    User = get_user_model()
    # 팔로우 받는 사람
    person = get_object_or_404(User, username=username)
    # 팔로우 하는 사람
    user = request.user

    # 본인은 팔로우할 수 없다.
    if user != person:
        if person.followers.filter(pk=user.pk).exists():
            person.followers.remove(user)
        else:
            person.followers.add(user)
    return redirect('accounts:profile', person.username)
```
```html
<!-- accouts/profile.html -->

{% extends 'base.html' %}

{% block content %}
  <h1>{{ person.username }}님의 프로필</h1>
  {% if person != user %}
  <p>
      <a href="{% url 'accounts:follow' person.username %}">
          {% if user in person.followers.all %}
          팔로우 취소
          {% else %}
          팔로우
          {% endif %}
      </a>
  </p>
  {% endif %}
  <p>{{ person.followers.count }}명이 팔로우 하고 있습니다.</p>
  <p>{{ person.followings.count }}명을 팔로우 하고 있습니다.</p>
  <hr>
  <h2>팔로우 명단</h2>
  <ol>
      {% for follower in person.followers.all %}
          <li>{{follower.username}}</li>
      {% endfor %}
  </ol>
  <hr>
  {% if user == person %}  <!-- 내 프로필일 경우에만 게시글 목록을 보여준다. -->
  <h2>내 게시글 목록</h2>
  <ul>
    {% for article in person.article_set.all %}
    <li>
      <p>{{ article.title }}</p>
    </li>
    {% endfor %}
  </ul>
  {% endif %}

{% endblock %}
```






