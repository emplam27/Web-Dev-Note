# HTML 정리





[TOC]



### :star::star:항상 screen reader를 염두하며 작성할 것(SEO에 영향)



## 기본 골격



### 1. Doctype

> 어떠한 표준으로 문서를 작성했는지 나타내는 html버전 선언문
>
> - `<html>`의 lang 속성: SEO때문에 필수적으로 들어가야 함

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  
</body>
</html>
```





### 2. Head

> 설정과 정보들을 담기 위한 부분, 본문에는 표시되지 않음. 



#### (1) title

> 단 한번만 사용 가능. 페이지의 내용을 함축하는 키워드를 포함해 50~60자 정도로 지정
>
> - 웝 제목을 설정할 때 사용
> - 탭에 표시될 부분 
> - 즐겨찾기에 추가될 타이틀
> - 검색엔진 검색 결과물에서 가장 크게 나오는 타이틀

 ```html
<title>웹 제목</title>
 ```




#### (2) link

> CSS, JS와 연결할때 쓰임
>
> - href
>
> - `rel`: **필수속성**, 현재 문서와 링크된 문서의 관계성을 지정해주는 속성
>
>   - `stylesheet`: CSS파일
>
>     ```html
>     <link rel=”stylesheet” href=”css/style.css”>
>     ```
>
>   - `icon`: 아이콘, 파비콘 등을 불러올때 활용
>
>     ```html
>     <link href="favi.ico" rel=”icon”>
>     <link href="icon.png" rel=”icon” type="image/png" size="16x16">
>     <link href="icon.gif" rel=”icon” type="image/gif">
>     ```
>
> - `hreflang`: 링크된 파일의 언어를 설정해줄 때 사용하는 속성



#### (3) style

> CSS를 위한 부분. 맨 나중에 적힌 스타일이 우선권을 갖는다. 
>
> - `media`: 어떤 기기를 타겟으로 사용되는지를 지정해주는 속성



#### (4) base

> relative path전에 올 base url을 지정할 수 있음
>
> - `href`, `target` 속성



#### (5) script & noscript

> `<script>`: JavaScript를 불러올 수 있음
>
> - `src`: .js 파일을 불러올 때 사용
>
> `<noscript>`: JavaScript가 서포트 되지 않는 브라우저나 disabled된 브라우저에서 로딩되는 태그



#### (6) meta (중요) :bulb::bulb::bulb:

> 페이지에 보여지지 않는 태그이면서 브라우저, SEO 검색에 효과적이도록 마크업 하는 작업
>
> - 페이지를 사용자들에게 적합한 페이지로 보여지게해주는 정보, 마케팅과 직접적인 연관
> - 브라우저, 사용기기, 서치엔진, 소셜미디어등을 위한 태그
> - Open Graph Protocol 설정에서 사용, https://metatags.io/에서 확인가능



##### Open Graph:bulb::bulb::bulb:

https://metatags.io/에서 각 SNS에 맞는 메타테그를 설정할 수 있음



##### charset & name 속성

> - `charset`: 페이지의 케릭터 인코딩을 위한 속성(UTF-8, ISO-8859-1 등)
>
> - `name="viewport"`: 표준은 아니나 반응형 페이지에서 만들기 위해 사실상 표준처럼 사용
>   - `content` 속성으로 `width=device-width`, `height=device-height`, `inital-scale=1.0`, `minimum-scale=1.0`, `maximum-scale=3.0`, `user-scalable=no`
> - `name="robots"`: 페이지가 검색엔진 봇에 어떻게 반응해야하는지에 대한 정보
>   - `content` 속성으로 `all`, `none`, `index`, `noindex`, `follow`, `nofollow`
>   - `index`: 페이지를 검색엔진 결과물로 뿌려지게 허용하는 속성 
>   - `follow`: 페이지를 포함해 링크가 걸린 모든 페이지를 수집 대상으로 정하게 하는 설정
> - `name="robots"`: 페이지가 생성된 날짜를 입력 가능
>
> **아래 두 태그는 정확하게 페이지가 담고있는 내용과 일치가는 내용을 기입, 불필요한 정보는 입력하지 않아야함. 검색 엔진에 의해 스팸처리될 수 있음**
>
> - `name="description"`: 검색엔진에서 다루어지는 정보. 
> - `name="keywords"`: 검색엔진에게 페이지의 정보를 알려주는 역할.

 ```html
<meta charset="UTF-8"/>

<!--반응형 페이지를 만들기 위해 가장 많이 사용하는 태그-->
<meta name="viewport" content="width=device-width, inital-scale=1.0, minimum-scale=1.0, maximum-scale=3.0"/>

<meta name="description" content="HTML5와 Javascript 학습콘텐츠"/>
<meta name="keywords" content="HTML5, CSS, Javascript"/>

<meta name="robots" content="all"/>

<meta name="date" content="2020-06-11T03:12:37+10:00"/>
 ```



##### http-equiv 속성

> - `http-equiv="X-UA-Compatible" content="IE=edge"`: Internet Explorer에서 어떤 렌더링 방식을 사용할 지 결정
> - `http-equiv="Subject" `, `Title`, `Author`, `Publisher`, `Otheragent`, `Location`, `Distribution`, `Copyright` 등: 페이지의 작성자 정보를 나타낼 수 있음
> - `http-equiv="Cache-Control" content="no-cache"`, 
>   `http-equiv="Pragma" content="no-cache"`: 페이지가 캐시를 사용하지 않게할 수 있음
> - `http-equiv="Expires" content="만료일"`: 캐시 만료일을 설정할 수 있음
> - `http-equiv="Refresh" content="60"`: 해당 초 마다 페이지를 새로고침
> - `http-equiv="Refresh" content="10;url=이동할url"`: 해당 초 뒤에 url로 이동함







### 3. Body

> 본문을 위한 부분. `<body>`태그로 감싸줌









## 태그의 attribute(속성)



#### global attribute(공통으로 사용되는 속성) & 

> 모든 태그에서 사용하는 속성들

##### (1) class

여러 요소를 그룹지어서 선택해야할 상황이 있을 때 사용(CSS, JS)

##### (2) data-*

HTML과 DOM사이에서 정보를 주고 받을 때 사용하는 속성. *에 어떤것이든 들어갈 수 있음

##### (3) hidden

boolean값을 가지며, 요소를 보이게할것인지, 안보이게 할 것인지 정하는 속성

##### (4) id

한번만 사용 가능하며, 요소를 특정할 때 사용하는 속성

프론트엔드에서는 id를 사용하여 스타일을 주는 것은 지양해야함

##### (5) lang

한 페이지에서 다른 언어를 사용할때 사용하는 속성

##### (6) style

스타일을 입힐 때 사용, 사용을 지양함

##### (7) tabindex

페이지에서 tab을 사용하였을 때, tab이 요소를 가르키기위해 움직이는 순서정할 때 사용하는 속성

##### (8) title

부가적인 설명이 필요할 때 사용하는 속성







### state(상태)

##### active

마우스로 누르는 순간부터 마우스 버튼을 때는 순간까지의 시간

##### hover

마우스가 올라가있는 순간

##### focus

input, select, a 등사용자가 마우스나 키보드의 tab을 사용해 focus가 되어있는 상태

##### focus-within

자식요소 중  input, select, a 등 focus가 되어있는 상태

visited(`<a>` 등에서 사용)

이미 방문한 적이 있는 상태









#### tag specific attribute(태그 전용 속성)

> 각 태그마다 사용되는 속성들









### 1. 문서관련 태그

#### 문장 작성

```html
<h1>heading 헤딩</h1>
<p><strong>strong 스트롱</strong></p>
<p><em>em 이텔릭</em></p>
<p><blockquto>인용문 나타내는 블록요소</blockquto></p>
<p><q>인용문을 나타내는 인라인 요소</q></p>
```

>- 헤딩: `<h1>` ~ `<h6>`까지 
>   - **h1 태그는 한 페이지 안에서 한번만 사용할 것. 두번이상 사용하게 되면 SEO(검색엔진)이 정보가 불분명하다고 판단.**
>   - **사람에게는 h1태그가 중요하지 않으나 SEO(검색엔진)에게는 중요한 태그**
>
>
>
>- `span`: inline 속성을 가지며 다음의 용도를 가짐
>  - **태그안에 들어오는 글귀를 선택할 때**
>  - 글귀의 일부분을 선택해서 다른 스타일을 적용할 때
>  - 서버에서 데이터를 받아서 뿌려주는 부분적인 정보
>
>
>
>- `<strong>`, `<em>` 등은 **Screen Reader, SEO 등에 반영됨**
>   - 볼드와 강조 : `<strong></strong>`, 이텔릭과 강조 : `<em></em>`
>
>
>
>- `<blockquoto>` : 블록단위 인용문, `<q>` : 인라인 단위 인용문





- #### 단락 나누기

> `<p>` : 단락 나누기
>
> `<br>` : 줄 바꾸기
>
> `<hr>` : 수평선 긋기
>
> `<pre>` : 문자 원형 그대로 출력하기

```html
<!--단락 예시-->
<p>
    문구를 입력할 수 있다.
    줄을 바꿔 적어도 
    한줄로 출력된다.
</p>

<p>연속으로 적어도 한줄이 띄어져 단락이 바뀌어 출력된다. 엔터 2번의 효과</p>

문구를 입력할 수 있다.
역시 줄을 바꿔 적어도
한줄로 출력된다.<br>

하지만 이 태그는 다음 문구를 바로 다음줄로 이어서 출력한다. 엔터 1번의 효과. 
마침태그는 필요 없다.<br>

수평선 긋기: <hr>

<pre>해당 태그는 
엔터
	탭
띄  어  쓰  기
등을 문구의 원형 그대로 출력해준다.</pre>

```







### `<a>`: link 링크연결

```html
<a href="http://www.naver.com" targer="_blank" title="asdfasdf">asdf</a>
```

>`<a>`태그를 사용.  <u>asdf</u> 가 생성되며, 클릭할 시 링크 이동
>
>- `href`: 연결할 링크
>- `target`: 링크를 열 위치
>   - _self : 현재창에서 링크 열기(기본값)
>   - _blank : 새창에서 링크 열기
>   - _parent : `<iframe>`에서 링크을 열었을 때, 이를 감싸고 있는 브라우저에서 링크 열기
>   - frameName: 브라우저 내에 여러 frame이 있을 때, 특정 frame을 정하여 링크 열기
>- `title`: 마우스를 <u>asdf</u> 위에 올리면 보여지게 될 제목(설명)







### list 리스트

> 어떤 항목에 다른 항목이 종속되어있다면 `<ul>`을 사용하는것이 좋음. Screen Reader에서 항목간의 포함관계를 파악할 수 있음 

- 순서가 있는 리스트 : `<ol>` 
  - `reversed="true"`: boolean, 항목을 뒤집을지 정하는 속성
  - `start="number"`: t시작되는 번호를 결정할 수 있음, 음수도 가능
  - `<li>`의 속성 `value="number"`: 해당 항목의 숫자를 정할 수 있음
- 순서가 없는 리스트 : `<ul>`
- `<dl>`: definition list(정의 목록), 용어를 설명하는 목록을 만들 때 사용, 주로 어떠한 요소의 상세설명에 사용
  - `<dt>`: definition term(정의 용어), 용어의 제목을 넣을 때 사용
  - `<dd>`: definition description(정의 설명), 용어를 설명하는 데 사용

```html
<ol>
    <li>요소1
        <ul>
            <li>하위요소 1</li>
            <li>하위요소 1</li>
        </ul>
    </li>					
    <li>요소2</li>
</ol>
```







### 2. 미디어 태그



#### `<img>`태그

```html
<img src="asdf.jpg" alt="asdf" title="asdf">
```

>- src: 이미지의 경로
>- alt: 이미지가 깨진 경우, 문자를 엑스박스 안에 출력해줌, **Screen Reader에 사용, SEO에 영향**
>- title: 이미지에 마우스를 올릴경우 나오는 설명



#### image format

- `BMP` : 윈도우 환경 비트맵 데이터 표현하기 위해 개발한 포맷 압춥을 사용하지 않아 용량이 큰 특징이 있다
- `JPGE` : 1600만 색상 표현가능 사용자가 이미지 크기를 조절 가능 압축효율이 좋아서 웹에서 많이 이용됨
- `GIF` : 8비트 256 색상 표현가능 여러장의 이미지 파일을 하나의 이미지로 표현가능 색상이 256 으로 제한되어 퀄리티가 필요한 이미지에 적합하지 않음
- `PNG` : `gif`,`jpeg` 보다 빠른 화면출력이 가능해 웹에서 많이 이용됨 높은 압축률과 고해상도 이미지 표현이 가능함
- `TIFF` : 호환성이 좋은 최초의 파일 포맷 LZW 라고 부르는 무손실 압축 사용
- `SVG` : XML 기반 벡터 파일 형식 xml 로 작성되어 있어 웹이나 txt 로 여는것이 가능 메타 데이터 입력을 하여 seo에 용이하도록 작업 가능



#### `<video>`태그

```html
<video src="">
```

> - `src`: 비디오의 경로
> - `controls`: control bar의 표시여부
> - `autoplay`: 바로시작
> - `loop`: 반복재생
> - `muted`: 음소거
> - `poster`: 동영상의 재생 전 표시 이미지
> - `preload`: 
>   - `none`: 재생 전 동영상이 load되지 않음 
>   - `auto`: 재생 전 동영상이 load됨
>   - `metadata`: 미디어의 metadata만 load하고, 동영상은 load하지 않음



#### `<source>`태그

> 브라우저 환경에 따라 로드한 video가 재생이 되지 않을 수 있음. 이럴때 조금더 안좋은 품질의 비디오나 다른 인코딩 방식을 가진 비디오를 `<source>`로 준비하여 `<video>`태그 다음에 붙여주면 위 video가 로드되지 못할 때, source에 있는 비디오를 로드한다. 다단으로 붙이는것도 가능

```html
<source src=""/>
```





`<audio>`태그

```html
<audio src="">
```

> - `src`: 오디오의 경로
> - `controls`: control bar의 표시여부
> - `autoplay`: 바로시작
> - `loop`: 반복재생
> - `muted`: 음소거
> - `preload`: 
>   - `none`: 재생 전 오디오가 load되지 않음 
>   - `auto`: 재생 전 오디오가 load됨
>   - `metadata`: 미디어의 metadata만 load하고, 오디오는 load하지 않음





`<canvas>`태그

> JavaScript로 그림을 그릴 수 있게 일정 영역을 지정해 주는 태그
>
> 서버에서 정보를 받아 그래프, 3D 애니메이션을 보여주는 등에 사용할 수 있음

```html
<canvas id="myCanvas"></canvas>
<script>
	const canvas = document.gerElementById("myCanvas")
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = "#DFDFDF"
    ctx.fillRect(0, 0, 80, 80)
</script>
```









### 3. 컨테이너형 태그



### non-sementic tag

아무런 의미가 부여되지 않은 태그, 콘텐츠를 분리하는 역할만 함

스타일을 주거나, 서버에서 데이터를 받아서 그룹형 컨테이너(혹은 모듈)로 manipulate를 해야할 때 사용

`<div>`: block형 태그

`<span>`: inline형 태그





### :bulb::bulb::bulb: sementic tag



![sementic tag](https://user-images.githubusercontent.com/60080670/94836322-d22ba280-044d-11eb-8138-0efd1bbf0da4.JPG)

> 구역을 나누는 div 대신 사용하는 의미를 가지는 태그. 검색엔진 등에 의미 있는 정보의 그룹을 태그로 표현
>
> 메타태그와 더불어 검색엔진 최적화를 위한 마크업 작업. **SEO의 접근성을 높힐 수 있음**



- `<header>`: 페이지의 header나 article의 header를 표시할 때 사용하는 태그
- `<nav>`: 다른 페이지로 이동할 수 있는 링크를 담는 태그
- `<main>`: 페이지의 중점적인 내용을 나타내는 태그
- `<section>`: 콘텐츠를 분류하는 태그, 여러번 사용할 수 있으며, 컨텐츠나 요소들의 그룹을 지을 때 사용
- `<article>`: 페이지의 실질적인 내용을 담는 태그
-  `<aside>`: 본문 외의 내용을 담거나 서포트하는 부분을 담는 태그
  - `<article>` 안에 있는 `<aside>`: article에 종속되어있는 내용을 서포트하는 정보들을 기입할 때 사용
  - `<article>` 밖에 있는 `<aside>`: 페이지 전체의 내용을 서포트하는 정보들을 기입할 때 사용, 다른페이지로 이동할 수 있는 네비게이션등으로 사용 가능
- `<footer>`: 사이트의 정보를 보여주는 태그
- 이외 `<details>`, `<figure>`,`<mark>`, `<time>` 등



 ```html
<body>
<!--header-->
<header>
	<h1>asdf</h1>
</header>
<!--navigator-->
<nav>
	<ol>
        <li> ~~~ </li>
        <li> ~~~ </li>
	</ol>
</nav>
<!--article-->
<article>
	aasdfasdfasdfasdfasdfasdfasdfasdf
</article>
<!--footer-->
<footer>
	<h5>
		<li>asdfasdf</li>
        <li>asdfasdf</li>
	</h5>    
</footer>
</body>
 ```







### form 태그 (중요)



#### form 요소의 속성 : action & method

```html
<form action="http://asdf.php" method="get" aotocomplete="on">
```

> - `action` : form안의 input들이 만들어낸 값을 해당 링크로 전송함
>
> - `method`: **GET** / **POST**
> - `autocomplete"`: (on, off), 예전에 주입했던 값을 보여줄 것인지 설정하는 속성
> - `novalidate`: (boolean), input의 type에 맞지 않아도 제출 가능하게 하는 속성
> - `targer`: (_blank, _self, _parent, _top, ), 서버에서 받은 반응값을 어느 프레임에 뿌려줄 것인지 설정하는 속성, `<a>`의 target과 같음



#### input 요소들의 공통속성

```html
<p>아이디: <input type="text" name="id" placeholder="아이디를 입력하세요" maxlength="10" required autofocus></p>
```

>- `type`: (**text, password, email, tel, number, radio, checkbox, color, date, month, file, range, search, url**), 모바일 환경에서 사용해야할 타입에 맞는 키보드를 보여주기 때문에 신경써야함
>- `name`: 서버에 전달될 서식 값의 이름, 반드시 필요
>- `required`: 반드시 입력되어야 하는 서식임을 의미
>- `value`: 기본적으로 주어지는 input의 값을 설정할 때 사용
>- `placeholder`:입력 폼에 짧은 힌트를 나타냄
>- `maxlength`: 서식 요소에 입력되는 값의 최대 길이 설정
>- `autofocus`: 폼 로딩이 완료되면 커서가 위치하는 곳 지정
>- `disabled`: (boolean), input을 사용하지 못하게 설정할 수 있는 속성
>- `form`: input이 종속되어있는 form의 id값을 지정할 수 있는 속성
>- `list`: 추천하고자 하는 input값을 가지고 있는 데이터 리스트의 id를 지정할 때 사용하는 속성
>- `autocomplete"`: (on, off), type에 맞지 않아도 제출 가능하게 하는 속성



#### text & password

```html
<form action="http://asdf.php">
    <p>아이디: <input type="text" name="id"></p>
    <p>비밀번호: <input type="password" name="pw"></p>
    <input type="submit">
</form>
```

> text는 글자가 보이고, password는 글자가 ***로 대체됨 
>
> 만일 아이디를 'asdf', 비밀번호를 '1111'로 입력하고 제출버튼을 누르면 
>
> http://asdf.php?id=asdf&pw=1111로 이동함



#### textarea

> 여러줄의 문자열을 입력할 수 있는 박스 생성

```html
<form action="">
	<textarea cols="50" rows="10" wrap="hard">default value</textarea>    
</form>
```

> cols, rows로 박스 크기 지정 가능
>
> wrap으로 줄바꿈 지정 가능(soft: 칸을 벗어나도 줄바꿈 안함, hard: 칸을 벗어나면 줄바꿈 함)



#### dropdown list

> 선택지 중 하나를 고를 수 있게 하는 메뉴

```html
<form action="http://asdf.php">
    <h1>색상</h1>
    <select name="color">
        <option value="black">검정</option>
        <option value="red">빨강</option>
        <option value="blue">파랑</option>
    </select>
    <input type="submit">
</form>
```

>메뉴에는 한글로 보이지만, 제출하게 되면 http://asdf.php?color=black 로 이동함
>
>- `size`: (number): size값을 넣게되면 모든 옵션을 볼 수 있게 펼쳐짐, 속성이 없다면 dropdown이 기본
>- `multiple`: 다중선택 가능



#### radio button & checkbox

> 한개 또는 여러개의 입력을 받을 수 있는 메뉴

```html
<form action="http://asdf.php">
    <p>
        <h1>색상(단일선택)</h1>
        <input id="black" type="radio" name="color" value="black" checked>
    	<label for="black" > 검정</label>
    	<input type="radio" name="color" value="red">
    	<label for="red" > 빨강</label>
		<input type="radio" name="color" value="blue">
    	<label for="blue" > 파랑</label>
    </p>
    <p>
        <h1>사이즈(다중선택)</h1>
		<label for="s_size" >S:</label>
        <input id="s_size" type="checkbox" name="size" value="90" checked>
		<label for="m_size" >M:</label>
    	<input id="m_size" type="checkbox" name="size" value="95" checked>
		<label for="l_size" >L:</label>        
		<input id="l_size" type="checkbox" name="size" value="100">
    </p>
    <input type="submit">
</form>
```

>radio는 **같은 name**으로 지정되어 있는 한개 옵션만 선택 가능
>
>- [x] checkbox는 **같은 name**으로 지정되어 있어도 다중 선택이 가능
>
>checked가 있으면 default로 선택되어 있음
>
>메뉴에는 한글로 보이지만, 제출하게 되면 http://asdf.php?color=black&size=90&size=95 로 이동함



#### label

> 입력 요소에 캡션을 지정, 사이트 정보력을 높임. 주로 라디오버튼에서 많이 활용

```html
<form action="http://asdf.php">
    <p>
        <label for="id_txt">아이디:</label>
        <input id="id_txt" type="text" name="id" value="default value">
    </p>
    <p>
        <label for="pw_txt">비밀번호:</label>
        <input id="pw_txt" type="password" name="pw" value="default value">
    </p>
</form>
```

>'아이디: ', '비밀번호: ' 등 텍스트를 클릭해도 input을 받을 수 있게 입력창으로 넘어가짐
>
>위 두가지 방식으로 동작 가능(id 지정, 비지정)
>
>**`<label>`안에 `<input>`이 들어가 있으면 안됨. SEO가 웹페이지의 등급을 떨어뜨림**



#### button

> '전송', '버튼', '재설정' 이라는 글자가 보이게 됨. '전송'을 누르면 http://asdf.php로 input데이터를 전송

```html
<form action="http://asdf.php">
    <input type="submit" value="전송">
    <input type="button" value="버튼">
    <input type="reset">
</form>
```



#### fieldset & legend

> 요소들을 공통된 이름으로 그룹화. `<fieldset>`, `<legend>` 요소로 감싸줌

```html
<form action="">
    <fieldset>
        <legend>개인정보</legend>
        <ul>
            <li>이름: <input type="text"></li>
            <li>비밀번호: <input type="password"></li>

        </ul>
    </fieldset>
</form>
```

>`<fieldset>` : 영역(박스)를 만들어줌, 이름을 정해주지는 않음
>
>`<legend>` : 이름을 정해줌, 영역(박스)를 만들어주지는 않음







### table 태그

> 표를 만들기 위한 부분. `<table>`태그로 감싸줌

```html
<!--표 예시-->
<table border="1"> <!-- 일반적인 상황에서 border사용 X -->
    <caption>명단</caption>
    <thead>
        <tr>
            <th>이름</th><th>나이</th><th>지역</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>김김김</td><td rowspan="2">20</td><td>대전</td>
        </tr>
        <tr>
            <td>이이이</td><td>서울</td>
        </tr>
        <tr>
            <td>박박박</td><td>25</td><td>대전</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="2">합계</td><td>3</td>
        </tr>
    </t>
</table>
```

>행 만들기: 항목 하나하나를 `<td></td>`로 묶어줌
>
>열 만들기: 각각의 행을 `<tr></tr>`로 묶어줌
>
>가로칸 병합하기: `<td colspan=""></td>`, 시작점으로부터 왼쪽으로 열들을 합쳐준다는 의미. 
>
>세로칸 병합하기: `<td rowspan=""></td>`, 시작점으로부터 아래쪽 행들을 합쳐준다는 의미
>
>표에 이름붙이기: `<caption></caption>`
>
>
>
>`<thead></thead>` : 해당 경우에는 `<td></td>` 태그를 `<th></th>` 태그로 변경할 수 있고, 변경하면 글씨체가 bold 되며, `<th>`는 제목셀에 사용
>
>`<tbody></tbody>` : 그룹핑의 목적
>
>`<tfoot></tfoot>` : 가장 아래로 갈 행을 그룹핑. 아무곳에서 지정해도 가장 아래로 내려감











## 브라우저 작동 원리

url로 서버에 요청보내 브라우저가 html, css, js 파일을 받음

html을 Rendering Engine으로 보냄

Rendering Engine에서 

HTML Parsing: html 문서의 속성과 요소들을 브라우저가 이해할 수 있는 형식으로 변환를 분석하는 

DOM Tree 생성: HTML에 명시된 요소를 트리구조로 잡아준다.

File download: head태그 안의 file들을 다운로드 받는다. (CDN, CSS, JS 등)

DOM(Documments Object Model) 생성: JS 등이 각 요소들을 타겟할 수 있게 만듦  

![브라우저 동작 원리1](https://user-images.githubusercontent.com/60080670/94836502-04d59b00-044e-11eb-9019-708112520ebb.jpg)

![브라우저 동작 원리2](https://user-images.githubusercontent.com/60080670/94836421-eec7da80-044d-11eb-94cb-aecb4fe7d082.jpg)











