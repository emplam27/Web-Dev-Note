# 쿼리개선

* 게시글 10개

* 댓글 10*10개

* 필수 라이브러리 : [django debug toolbar](https://django-debug-toolbar.readthedocs.io/en/latest/installation.html)

  ```bash
  $ pip install django-debug-toolbar
  ```

  * 설정 방법은 문서를 통해 익혀보세요 :) 

## 0. 관련 문서

* 데이터베이스 최적화 : https://docs.djangoproject.com/en/3.0/topics/db/optimization/
  * QuerySet 실행에 관한 이해 : https://docs.djangoproject.com/en/3.0/topics/db/optimization/#understand-queryset-evaluation
    * lazy하여, evaluated 되는 시점에 실행되며, cache를 활용할 수 있음. (각각 문서 확인할 것)
  * `count` , `exists`
    * https://docs.djangoproject.com/en/3.0/topics/db/optimization/#don-t-overuse-count-and-exists
    * 일반적으로 활용하는 것이 좋으나, 예시의 코드의 상황에서는 cache된 값을 바탕으로 length를 구하는 방식으로 풀어나갈 수 있음
  * `select_related` : https://docs.djangoproject.com/en/3.0/ref/models/querysets/#django.db.models.query.QuerySet.select_related
  * `prefetch_related` : https://docs.djangoproject.com/en/3.0/ref/models/querysets/#prefetch-related



## 1. 댓글 수 

### 개선전(11번)

```python
articles = Article.objects.order_by('-pk')
```

```html
<p>댓글 수 : {{ aritcle.comment_set.count }}</p>
```

![Screen Shot 2020-05-04 at 오후 3.36](md-images/Screen Shot 2020-05-04 at 오후 3.36-1588574247764.png)

### 개선후(1번)

```python
articles = Article.objects.annotate(comment_set_count=Count('comment')).order_by('-pk')
```

```html
<!-- 주의! comment_set_count로 호출 -->
<p>댓글 수 : {{ article.comment_set_count }}</p>
```

![Screen Shot 2020-05-04 at 오후 3.37](md-images/Screen Shot 2020-05-04 at 오후 3.37.png)

## 2. `select_related`

> 게시글을 작성한 사람을 출력하자.

> `select_related` 는 SQL JOIN을 통하여 데이터를 가져온다.
>
> 1:1, 1:N관계에서 참조관계 (N->1, foreignkey가 정의되어 있는 곳)

### 개선전(11번)

```python
articles = Article.objects.order_by('-pk')
```

```html
<h3>{{ article.user.username }}</h3>
```

![Screen Shot 2020-05-04 at 오후 3.38](md-images/Screen Shot 2020-05-04 at 오후 3.38.png)

### 개선후(1번)

```python
articles = Article.objects.select_related('user').order_by('-pk')
```

```html
<!-- 변경 없음 -->
<h3>{{ article.user.username }}</h3>
```

![Screen Shot 2020-05-04 at 오후 3.38 - 2](md-images/Screen Shot 2020-05-04 at 오후 3.38 - 2.png)

## 3. `prefetch_related`

> 게시글마다 댓글을 출력하자.

> `prefetch_related` 는 python을 통한 Join으로 데이터를 가져온다.
>
> M:N, 1:N관계에서 역참조관계(1->N)

### 개선전(11번)

```python
articles = Article.objects.order_by('-pk')
```

```html
{% for comment in article.comment_set.all %}
	<p>{{ comment.content }}</p>
{% endfor %}
```

![Screen Shot 2020-05-04 at 오후 3.42](md-images/Screen Shot 2020-05-04 at 오후 3.42.png)

### 개선후(2번)

```python
articles = Article.objects.prefetch_related('comment_set').order_by('-pk')
```

```html
<!-- 변경 없음 -->
{% for comment in article.comment_set.all %}
	<p>{{ comment.content }}</p>
{% endfor %}
```

![Screen Shot 2020-05-04 at 오후 3.42 - 2](md-images/Screen Shot 2020-05-04 at 오후 3.42 - 2.png)

## 4. 게시글의 댓글마다 사람의 이름과 댓글을 출력

### 개선전(111번)

```python
![Screen Shot 2020-05-04 at 오후 3.48](스크린샷/Screen Shot 2020-05-04 at 오후 3.48.pngarticles = Article.objects.order_by('-pk')
```

```html
![Screen Shot 2020-05-04 at 오후 3.49](스크린샷/Screen Shot 2020-05-04 at 오후 3.49.png{% for comment in article.comment_set.all %}
	<p>{{ comment.user.username }} : {{ comment.content }}</p>
{% endfor %}
```

![Screen Shot 2020-05-04 at 오후 3.48](md-images/Screen Shot 2020-05-04 at 오후 3.48.png)

### 개선후(2번)

```python
from django.db.models import Prefetch

articles = Article.objects.prefetch_related(
    	Prefetch('comment_set'),
		queryset=Comment.objects.select_related('user')
	).order_by('-pk')
```

```html
{% for comment in article.comment_set.all %}
	<p>{{ comment.user.username }} : {{ comment.content }}</p>
{% endfor %}
```

![Screen Shot 2020-05-04 at 오후 3.49](md-images/Screen Shot 2020-05-04 at 오후 3.49.png)



