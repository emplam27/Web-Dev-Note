# JS_AJAX & Axios

> Asynchronous Javascript And Xml(비동기식 자바스크립트와 xml)





### :bulb:JS는 non-blocking의 특징을 갖는다.

>  비동기 작업에서 사용하며, 요청을 보내고 계속 코드를 진행하고 응답이 돌아오면 콜백함수를 실행하는 특성

```js
 // 제대로 동작하지 않는다.
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://koreanjson.com/posts/1')
    // non-blocking 하다.(함수가 모두 종료될 때 까지 기다리지 않는다.)
    xhr.send() 
    // 요청을 보낸 이후 응답이 제대로 도착하지 않았지만, 바로 res 에 값을 할당한다. => ""
    const res = xhr.response
    console.log('RES: ', res)
```





## Axios

> - ajax요청을 promise기반으로 편리하게 생성할 수 있게 도와주는 라이브러리
> - **axios**는 XHR(XMLHttpRequest)을 보내고 응답받는 결과를 **JSON**객체로 반환
>- promise는 요청이 오면 반드시 실행해주겠다는 의미
> - 비동기 요청이 여러번 일어날 경우`async, await`도 사용이 가능하다. 코드가 간결해짐

```bash
$ npm install axios
```

```js
// promise => 성공/실패
    // 성공했을 때, 어떤 일을 한다 .then()
    // 실패했을 때, 어떤 일을 한다 .catch()
    console.log(1)
    axios.get('https://koreanjson.com/posts/1')
      .then(function (res) { return res.data })
      .then(function (data) { return data.content } )
      .then(function (content) { console.log(content) })
    console.log(2)
    // callback 함수들 시작


```



환경 변수를 이용해 API_KEY 관리하기









## :bulb:AJAX를 활용하여 장고 '좋아요' 기능 개선하기



### 기존 장고 좋아요 흐름

1.  HTML 페이지를 가져온다.
2.  좋아요 버튼을 누른다: `/article/3/like/`경로로 요청을 보낸다.
3.  view 함수에서 좋아요 로직을 실행한 뒤, 새롭게 detail 페이지를 응답한다.
4.  브라우저는 새롭게 응답받은 html 페이지를 전체 re-render 한다. (좋아요 이후의 데이터가 반영되어 있다.)





### AJAX를 활용한 장고 좋아요 흐름

1. HTML페이지를 가져온다.
2. 좋아요 버튼을 누른다: `/article/3/like/`경로로 **AJAX을 활둉하여** 요청을 보낸다.
3. view 함수에서 좋아요 로직을 실행한 뒤, **새롭게 페이지에 반영할 데이터를 JSON 형식으로 응답한다.**
   - 로직 처리 후 총 몇명이 좋아요를 눌렀는지에 대한 정보
   - 클릭한 사람이 좋아요 로직 처리 후 해당 게시글을 좋아하는지에 대한 boolean값
4. 위에서 Django view 함수에서 응답받은 데이터를 기반으로 JS를 통해 화면을 조작한다.





### index.html

> - :star:html태그에 `data-속성명=속성값` 속성을 추가하면 이후 JS에서 `객체.dataset.속성명`으로 `속성값`을 가져올 수 있음
> - `addEventListner` 활용 시 인자로 넘겨준 `event`를 통해 `event.target`으로 해당 태그에 접근 가능

```html
{% extends 'base.html' %}

{% block content %}
  <h2>INDEX</h2>
  {% for article in articles %}
    <h3>작성자: {{ article.user }}</h3>
    <h4>제목: {{ article.title }}</h4>
    <p>내용: {{ article.content }}</p>
    {% if user in article.like_users.all %}
      <!-- JS에서 선택하기 위한 like-btn 클래스 추가, data-id 속성 추가 -->
      <i class="fas fa-heart fa-lg like-btn" style="color:crimson; cursor:pointer;" data-id="{{ article.pk }}"></i>
    {% else %}
      <i class="fas fa-heart fa-lg like-btn" style="color:black; cursor: pointer;" data-id="{{ article.pk }}"></i>
    {% endif %}
    <!-- JS에서 선택을 하기위한 id 추가 -->
    <span id="likeCount{{ article.pk }}">{{ article.like_users.all|length }} 명이 이 글을 좋아합니다.</span>
    <hr>
  {% endfor %}
  <a href="{% url 'articles:create' %}">CREATE</a>

  <script>
    // 좋아요 버튼을 클릭했을 때 axios로 요청을 보낸다.

    // like-btn 선택자로 모든 article의 좋아요 버튼을 가져온다.
    const likeBtns = document.querySelectorAll('i.like-btn')

    // 모든 좋아요 버튼에 대해 for문을 돌면서
    likeBtns.forEach(likeBtn => {
      // axios를 통해서 click event가 발생 시 다음 함수를 실행한다.
      likeBtn.addEventListener('click', event => {
        console.log('like button clicked!')
        console.log(event.target.dataset)
        // dataset은 data 이후의 정보를 가져옴 
        const article_pk = event.target.dataset.id

        axios.get(`/articles/${article_pk}/like/`)
          .then(response => {
            // 응답받은 데이터를 기반으로 화면을 수정한다.
            console.log(response.data)
            const { liked, count } = response.data
            
            // liked 값에 따라 하트 색 변경
            if (liked) {
              event.target.style.color = 'crimson'
            } else {
              event.target.style.color = 'black'
            }

            // like 로직 처리 후 total liked_count 값 변경
            document.querySelector(`#likeCount${article_pk}`).innerText = count + ' 명이 이 글을 좋아합니다.'          
          })
        })
      })
  </script>

{% endblock %}

```



### views.py

```python
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Article
from .forms import ArticleForm

# JsonResponse를 통해 JSON형식으로 데이터를 반환
from django.http import JsonResponse


def index(request):
    articles = Article.objects.order_by('-pk')
    context = {
        'articles': articles,
    }
    return render(request, 'articles/index.html', context)


@login_required
def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save(commit=False)
            article.user = request.user
            article.save()
            return redirect('articles:index')
    else:
        form = ArticleForm()
    context = {
        'form': form,
    }
    return render(request, 'articles/form.html', context)


def like(request, article_pk):
    user = request.user
    article = get_object_or_404(Article, pk=article_pk)

    if article.like_users.filter(pk=user.pk).exists():
        article.like_users.remove(user)
        liked = False  # 좋아요를 눌렀는지 여부
    else:
        article.like_users.add(user)
        liked = True

    # 로직 처리 후 총 몇명이 좋아요를 눌렀는지에 대한 정보
    # 클릭한 사람이 좋아요 로직 처리 후 해당 게시글을 좋아하는지에 대한 boolean값
    context = {
        'liked': liked,
        'count': article.like_users.count(),
    }

    # 더이상 template이 아닌 JSON 파일로 원하는 데이터만 반환
    return JsonResponse(context)
```

