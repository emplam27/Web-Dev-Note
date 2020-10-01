# Django REST API



### :bulb::bulb::bulb:Serializer

데이터들을 JSON형식으로 요청을 보내고, 받게 하는 구조화 방법. 





## Django_REST_API 사용하기



#### REST Framwork 설치

```bash
$pip install djangorestframework
```



#### settings.py


```python
INSTALLED_APPS = [
    # Local Apps
    'musics' # 사용자 앱
    ''''''
    
    # Third Party Apps 앱 등록하기
    'rest_framework', # djangorestframework
    ''''''
]
```



#### models.py

> 기존과 같은 모델링을 사용한다. 

```python
from django.db import models


class Artist(models.Model):
    name = models.CharField(max_length=50)
    
    
class Music(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    

class Comment(models.Model):
    music = models.ForeignKey(Music, on_delete=models.CASCADE)
    content = models.TextField()
```



#### JSON =>​ DB 명령어: loaddata

```bash
$ python manage.py loaddata musics/dummy.json
```



#### DB => JSON 명령어: dumpdata

```bash
$ python manage.py dumpdata --indent 2 musics > dummy.json
```



#### :bulb:serializeres.py

> serializers.py파일을 만든다. 
>
> models.py에서 정의한 model을 바탕으로 serializer를 구성하는데, 필요한 정보들을 상속받아 만든다.

```python
from rest_framework import serializers
from .models import Artist, Music, Comment


# POST api/v1/musics/<music_pk>/comments/
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content', 'music_id']


# List표현
class CommentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'content']


class MusicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Music
        fields = ['id', 'title', 'artist_id']


# music.comment_set.all()
class MusicDetailSerializer(MusicSerializer):
    comments = CommentListSerializer(source='comment_set', many=True)
	# 많은 수의 정보를 보여줘야 하는 부분은 many속성이 필요하다.
    class Meta(MusicSerializer.Meta):
        fields = MusicSerializer.Meta.fields + ['comments']


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name']


# arrist.music_set.all()
class ArtistDetailSerializer(serializers.ModelSerializer):
    music_set = MusicSerializer(many=True)
    music_count = serializers.IntegerField(source='music_set.count')

    class Meta:
        model = Artist
        fields = ['id', 'name', 'music_set', 'music_count']
```



#### urls.py

```python
urlpatterns = [
    path('artists/', views.artist_list, name='artist_list'),
    path('artists/<int:artist_pk>/', views.artist_detail, name='artist_detail'),
    path('musics/', views.music_list, name='music_list'),
    path('musics/<int:music_pk>/', views.music_detail, name='music_detail'),
    path('musics/<int:music_pk>/comments/', views.comment_create, name='comment_create'),
    path('comments/<int:comment_pk>/', views.comment_update_and_delete, name='comment_update_and_delete'),
]
```



#### views.py

```python
from django.shortcuts import get_object_or_404
from rest_framework.response import Response  # 응답하는 메서드
from rest_framework.decorators import api_view  # 요청 방식을 필터링
from .models import Artist, Music, Comment
from .serializers import ArtistSerializer, ArtistDetailSerializer
from .serializers import MusicSerializer, MusicDetailSerializer
from .serializers import CommentSerializer


@api_view(['GET'])
def artist_list(request):
    artists = Artist.objects.all()
    serializer = ArtistSerializer(artists, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def artist_detail(request, artist_pk):
    artist = get_object_or_404(Artist, pk=artist_pk)
    serializer = ArtistDetailSerializer(artist) # 객체 하나만 받기 때문에 many 필요없음
    return Response(serializer.data)


@api_view(['GET'])
def music_list(request):
    musics = Music.objects.all()
    serializer = MusicSerializer(musics, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def music_detail(request, music_pk):
    music = get_object_or_404(Music, pk=music_pk)
    serializer = MusicDetailSerializer(music)  # python => JSON
    return Response(serializer.data)


@api_view(['POST'])
def comment_create(request, music_pk):
    # 포스팅을 해달라고 하는 요청이 들어올 때는 data=request.data 사용
    serializer = CommentSerializer(data=request.data)  # JSON => python
    if serializer.is_valid(raise_exception=True):
    # raise_exception: 검증에 실패시 400 bad request 응답을 주기 위함
        serializer.save(music_id=music_pk)
    return Response(serializer.data)


@api_view(['PUT', 'DELETE'])
def comment_update_and_delete(request, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk)
    if request.method == 'PUT':
        serializer = CommentSerializer(data=request.data, instance=comment)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'message': '성공적으로 수정되었습니다.'})
    else:
        comment.delete()
        return Response({'message': '성공적으로 삭제되었습니다.'})
```











## :star::star::star:DRF를 사용하여 Django 로 Back-End 구현하기





### 사용자 인증 백엔드 구현(로그인, 회원가입)



#### (1) django-rest-auth & django-allauth 설치

> django-rest-auth(allauth 사용하면 소셜 로그인 사용 가능): https://django-rest-auth.readthedocs.io/en/latest/installation.html
>
> Django REST framework Authentication(Token 사용법): https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication

```bash
$pip install django-rest-auth
$pip install django-allauth
```



#### (2) settings.py 설정

```python
INSTALLED_APPS = [

    # 3rd party
    'accounts',
    'articles',

    # REST framework & Authentication
    'rest_framework',
    'rest_framework.authtoken',
    
    # django-rest-auth
    'rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'rest_auth.registration',

	# Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

# 하단 추가

AUTH_USER_MODEL = 'accounts.User'

SITE_ID = 1

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 사용자 인증을 위해 Token을 사용
        'rest_framework.authentication.TokenAuthentication',
    ]
}
```



#### (3) urls.py 설정

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('articles/', include('articles.urls')),
    
    # django-rest-auth
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/signup/', include('rest_auth.registration.urls'))
]
```



#### (4) migrate 실행

> django-rest-auth로 인해 model이 새로 생겨나기 때문. 서버를 실행하기 전 migration 실행

```bash
You have 6 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): account, authtoken, sites.
Run 'python manage.py migrate' to apply them.
```



#### (5) models.py & serializers.py 설정

```python
# accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


# accounts/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username',)
```







### 사용자 인증 API 요청보내기



#### (1) signup 요청

- URL: http://127.0.0.1:8000/rest-auth/signup/

- method: **POST**

- Header: 없음

- Body: 

  ```json
  {
      "username": "dkdlel",    
      "password1": "qlalfqjsgh",
      "password2": "qlalfqjsgh"
  }
  ```

- Response:

  > 회원 가입 후, 로그인까지 진행되어,  사용자 인증 Token값을 보내줌

  ```json
  {
      "key": "dde726c9771e39698a6db1068ba02d7b65425594"
  }
  ```





#### (2) login 요청

- URL: http://127.0.0.1:8000/rest-auth/login/

- method: **POST**

- Header: 없음

- Body: 

  ```json
  {
      "username": "dkdkel",
      "email": "",
      "password": "qlalfqjsgh"
  }
  ```

  

- Response:

  ```json
  {
      "key": "dde726c9771e39698a6db1068ba02d7b65425594"
  }
  ```









### CRUD 백엔드 구현



#### (1) model.py & serializers.py 설정하기

> - user를 사용하는 serializer가 있다면 `required=False`를 꼭 붙여줄 것
>   - `GET`요청: is_valid 함수가 실행되지 않았기 때문에 required=False 옵션이 사용되지 않음
>   - `POST`요청:  POST 요청의 경우 article 에 해당하는 데이터만 요청으로 들어오기 때문에 user 에 대한 정보는 is_valid 에서 확인할 수 없어서, required=False 옵션으로 user 정보 유무에 대해서만 유효성 검사를 pass
>   - `PUT`요청: 해당 article 은 이미 작성이 되었던 instance 에 추가 데이터를 덮어쓴 상태이기 때문에 이미 내부적으로 user 정보가 있어서 유효성 검사에 user 정보를 pass 하지 않아도 괜찮겠지만, 어차피 POST 요청 때문에 required=False 속성을 줬기 때문에 user 에 대한 유효성 검사는 pass
>   - `DELETE`요청:  get_object_or_404 함수만을 통해 해당 article 을 가져온 뒤 바로 삭제만 진행

```python
# articles/models.py

from django.db import models
from django.conf import settings


class Article(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    
# articles/serializers.py

from rest_framework import serializers
from .models import Article
from accounts.serializers import UserSerializer

class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', )


class ArticleSerializer(serializers.ModelSerializer):
    # POST 요청에 들어왔을 때, 데이터의 유효성 검사에 있어서 article의 유효성 검사만 진행해야 함.
    # user는 is_valid에서 인증되지 않으므로 일단 유효성 검사에서 제외한 이후 user를 따로
    # 저장해주는 방법을 사용
    user = UserSerializer(required=False)
    
    class Meta:
        model = Article
        fields = '__all__'
        # API 교청으로도 수정하지 못함
        read_only_field = ('id', 'created_at', 'updated_at', ) 
```



#### (2) articles/urls.py & views.py 설정하기

```python
# articles/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('<int:article_pk>', views.detail),
]


# articles/views.py
from django.shortcuts import get_object_or_404
from rest_framework.response import Response  # JSON으로 응답
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated  
from .serializers import ArticleSerializer, ArticleListSerializer
from .models import Article


# 요청을 restful하게
# GET       /articles/      => article 리스트 요청
# POST      /articles/      => article 요청
@api_view(['GET', 'POST'])  # 필수적인 요소, 요청받을 method 정해주기
@permission_classes([IsAuthenticated])  # 인증된 사용자인지 확인
def index(request):
    if request.method == 'GET':
        articles = Article.objects.order_by('-pk')
        serializer = ArticleListSerializer(articles, many=True)  # Queryset => JSON
    else:
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True): # 유효성 검사
            serializer.save(user=request.user)  # 통과 시 저장
    return Response(serializer.data)  # 저장한 데이터 응답


@api_view(['GET'])
def detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = ArticleSerializer(article)
    return Response(serializer.data)
```







### CRUD API 요청보내기



#### (1) index 요청

- URL: http://127.0.0.1:8000/articles/

- method: **GET**

- Header: **{"Authorization": "Token 사용자 인증 토큰값"}**

- Body: 없음

- Response:

  ```json
  [
      {
          "id": 3,
          "title": "test-title"
      },
      {
          "id": 2,
          "title": "test-title_1"
      },
      {
          "id": 1,
          "title": "test-title"
      }
  ]
  ```





#### (2) create 요청

- URL: http://127.0.0.1:8000/articles/

- method: **POST**

- Header: **{"Authorization": "Token 사용자 인증 토큰값"}**

- Body:

  ```json
  {
      "title": "title",
      "content": "content"
  }
  ```

- Response:

  ```json
  {
      "id": 7,
      "user": {
          "id": 2,
          "username": "dkdlel"
      },
      "title": "title",
      "content": "content",
      "created_at": "2020-06-08T08:51:16.975820Z",
      "updated_at": "2020-06-08T08:51:16.975820Z"
  }
  ```






