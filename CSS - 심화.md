# 200311_CSS 심화



### (복습)display 설정 : 블록 & 인라인 (시험)

`display: block`

> - 줄바꿈이 일어남
> - 화면크기 전체의 가로폭을 차지
> - 블록레벨요소안에 인라인 레벨 요소가 들어갈 수 있음


`display: inline`

> - 줄바꿈 일어나지 않음
> - content너비만큼 가로폭을 차지
> - width, height, margin-top, margin-botton지정 못함
> - 상하여백은 line-height로 지정

`display: inline-block`

> - 블록과 인라인 레벨요소의 특징을 모두 가짐
> - 인라인처럼 한줄에 표시 가능
> - 블록처럼 width, height, margin 속성을 모두 지정할 수 있음





#### display: none & visibility: hidden 차이점

>- `display:none` : 요소 자체를 없앰. 공간에 남아있지 않음
>- `visibility: hidden` : 요소의 모습은 보이지 않지만, 공간에는 남아있음

```html
<head>
    <style>
        div{
            width:100px;
            height:100px;
            display: block;
            background-color: powderblue;
        }
        .none{
            display:none;

        }
        .hidden{
            visibility: hidden;
        }
    </style>
</head>
<body>
    <div>block</div>
    <!--모습도 남아있지 않고 공간에도 존재하지 않음-->
    <div class="none">none</div>
    <!--모습은 안보이지만 공간에는 존재하기 때문에 중간에 빈 공간이 존재함-->
    <div class="hidden">hidden</div>
    <div>block</div>
</body>

```









### 레이아웃 정렬 방법



#### 1. position 정리

- `position` : 특정 요소가 다른 요소들과 어떠한 관계 속에서 위치를 결정하는 지 설정
- `position: reletive`, `absolute`, `static`, `fixed`
- 정적인 상태(static) : `position: static;` , 위치설정을 하지 않은 상태, 부모를 기준으로 위치가 설정됨
- 상대 위치(relative) : `position: relative;` , static위치 에서 그 위치를 기준으로 위치가 설정됨
- 절대 위치(absolute) : `position: absolute;` 
  - 부모요소와의 관계가 끊어지기때문에, 자신의 크기는 자신의 content사이즈가 됨. 별도의 width, height값을 지정하여 크기를 조절해야 함
  - 조상요소 중에 `position: static`을제외한 `position` 설정한 요소가 있다면, 그 요소의 시작점을 절대좌표로 설정
  - 조상요소의 `position`속성이 `static`이거나, `position` 속성이 없다면 브라우저를 절대좌표로 설정
- 고정 위치 (fixed) : `position: fixed;`, 브라우져가 움직여도 그 요소는 움직이지 않게 설정(스크롤 등)
- `z-index` : 어떤 요소가 다른 요소 위에 나타나는지 설정, `position` 속성이 있는 경우에만 설정 가능

```html
<head>
    <style>
        .other, .parent{
            border:1px solid gray;
            margin:10px
        }
        #static{
            /*position을 static으로 설정
            해당 경우에는 left, top속성이 적용되지 않음*/
            position: static;
            left:100px;
            top:100px;
            border:5px solid tomato;
            margin:10px   
        }
        #relative{
            /*position을 relative로 설정
            해당 경우에는 static을 기준으로 left, top속성이 적용되어 parent바깥으로 움직임
            검사를 진행해서 left, top의 속성을 비활성화하면, static과 동일한 상태*/
            position: relative;
            left:50px;
            top:50px;
            border:5px solid cornflowerblue;
            margin:10px   
        }
        #absolute1{
            /*position을 absolute로 설정
            해당 경우에는 조상요소중에 position 속성을 갖는 요소가 없기 때문에 
            브라우저를 기준으로 left, top속성이 적용되어 브라우저 왼쪽 위에 붙음*/
            position: absolute;
            left:0;
            top:0;
            border:5px solid green;
            margin:10px   
        }
        .relative2{
            position: relative;
        }
        #absolute2{
            /*position을 absolute로 설정
            해당 경우에는 조상요소중에 position 속성을 relative로 갖는 parent가 있기 때문에 
            parent요소를 기준으로 left, top속성이 적용되어  parent에 위치함*/
            position: absolute;
            left:0;
            top:0;
            border:5px solid violet;
            margin:10px   
        }
        #fixed{
            /*position을 fixed로 설정
            해당 경우에는 브라우저의 지정 위치에 고정됨*/
            position: fixed;
            right:0;
            bottom:0;
            border:5px solid orange;
            margin:10px   
        }
    </style>
</head>
<body>
    <br>
    <br>
    <div class="other">1. static 위치 확인하기</div>
    <div class="parent">parent
        <div id="static">static</div>
    </div>
    <br>
    <div class="other">2. relative 위치 확인하기</div>
    <div class="parent">parent
        <div id="relative">relative</div>
    </div>
    <br>
    <div class="other">3. absolute1 위치 확인하기</div>
    <div class="parent">parent
        <div id="absolute1">absolute1(브라우저 좌표)</div>
    </div>
    <br>
    <div class="other">4. absolute2 위치 확인하기</div>
    <div class="parent relative2">parent
        <div id="absolute2">absolute2(parent 좌표)</div>
    </div>
    <br>
    <div class="other">5. fixed 위치 확인하기</div>
    <div class="parent">parent
        <div id="fixed">fixed(브라우저 크기를 바꿔도 고정)</div>
    </div>
</body>
```





#### 2. absolute & relative 차이(예제)

```html
<head>
  <style>
    div {
      box-sizing: border-box;
      height: 100px;
      width: 100px;
      text-align: center;
    }
    .parent{
      position: relative;
      height: 300px;
      width: 300px;
      border: 1px solid black;
    }
    .absolute {
      
      position: absolute;
      top: 100px;
      background: #9775fa;
    }
    .relative {
      position: relative;
      top: 100px;
      background: #9775fa;
    }
    .sibling {
      width: 200px;
      background: #7048e8;
    }
  </style>
</head>
<body>
  <div class="parent">
    <!--형box에게 absolute 적용시, 윗 공간은 빈 공간으로 인식하게됨
		따라서 형box 아래에 붙어야할 동생box가 그 빈공간으로 들어가게 됨-->
    <div class="absolute">형</div>
    <div class="sibling">동생</div>
  </div>
  <div class="parent">
    <!--형box에게 relative 적용시, 윗 공간은 차있는 공간으로 인식하게됨
		따라서 형box가 그 공간에 있다고 생각되기 때문에 형box 아래에 붙어야할 동생box가 
		정상적인 위치에 붙어 형box와 겹치게 됨-->
    <div class="relative">형</div>
    <div class="sibling">동생</div>
  </div>
</body>
```







#### 3. float & clear

> - `float` : 이미지나 요소들을 위로 띄우는 속성, `float: left`, `right`, `center` 등
>   - 이미지 등이 float속성이 부여되면, 그 뒤에 오는 요소들은 모두 float를 피해가게 됨
>   - float를 사용하는 경우 block 사용을 뜻하며, display 값이 inline인 경우 block으로 계산됨
>
> - `clear` : float를 피하고싶지 않다면 적용하는 속성, `clear: both`, `left`, `right`
>   float 을 무시하고 나오기 위해서 사용

```html
<head>
  <style>
    div {
      /*기본적으로 모든 박스들의 속성 설정*/
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      border: 1px solid black;
      background-color: #9775fa;
      color: white;
    }
    .inline {
      display: inline;
    }
    .inline-block {
      display: inline-block;
    }
    .float-left {
      float: left;
      background: pink;
    }
    .float-right {
      float: right;
      background: powderblue;
    }
    .clear {
      clear: both;
    }
    .clear-pseudo::after {
      display: block;
      content: "";
      clear: both;
    }
  </style>
</head>
<body>
  <h1>Float</h1>
  <!-- 1. -->
  <section>
    <h2>일반적인 흐름</h2>
    <p>일반적으로 위에서부터 아래로 하나씩 배치된다.</p>
    <h3>Block</h3>
    <div>Block 1</div>
    <div>Bolck 2</div>
    <hr>
    <h3>Inline</h3>
    <!--인라인속성의 경우 너비와 높이는 content사이즈-->
    <div class="inline">Inline 1</div>
    <div class="inline">Inline 2</div>
    <hr>
    <h3>Inline block</h3>
    <!--인라인레벨, 블록레벨의 속성을 모두 가져 box가 좌우로 배치됨
		하지만 사이에 4px의 공백이 발생-->
    <div class="inline-block">inline-block 1</div>
    <div class="inline-block">inline-block 2</div>
  </section>

  <!-- 2. -->
  <h2>Float</h2>
  <!--좌, 우로 float를 적용할 시 겹치지 않아 서로에게 영향을 주지 않는다면 
		한 줄 안에 같이 존재-->
  <div class="float-left">좌1</div>
  <div class="float-right">우1</div>
  <!--clear: both를 적용하여 float를 피하게 됨 -->
  <div class="clear">그냥 있고 싶음</div>

  <!-- 3. -->
  <section class="">
    <h2>Float II</h2>
    <!--float가 서로에게 영향을 주지 않아 한 줄 안에 같이 존재-->
    <div class="float-left">좌1</div>
    <div class="float-right">우1</div>
    <div class="float-left">좌2</div>
    <div class="float-right">우2</div>
  </section>
</body>
```





#### float가 발생시키는 문제 (예제)

>- 자식요소의 float 속성으로 인해 부모 영역의 높이가 사라지는 문제
>
>- clear한 요소의 margin이 제대로 표현되지 않는 문제
>
>  
>
>  해결 방안으로 `clearfix::after`를 많이 사용함

```html
<head>
  <style>
    div {
      box-sizing: border-box;
      width: 100px;
      height: 100px;
      border: 1px solid black;
      background-color: #9775fa;
      color: white;
    }
    .parent {
      background-color: gray;
    }
    .float-left {
      float: left;
      background: pink;
    }
    .float-right {
      float: right;
      background: powderblue;
    }
    /* 해결 방안! 
      float요소 뒤에 임의의 콘텐츠 요소를 넣어줌으로써 float를 해제하고 다시 flaot요소를 삽입하는 		과정*/
    .clearfix::after {
      content: "";
      display: block;
      clear: both;
    }
  </style>
</head>
<body>
  <section class="parent">
    <div>none</div>
  </section>
  <hr>
  <!-- 아래의 section에 clearfix 클래스를 추가 해주세요. -->
  <section class="parent ">
  <!--위 section태그는 clearfix가 있지 않으면 background-color를 표시하지 못함
	  위 section에 대해서 clearfix가 적용되어 parent의 속성값이 나타날 수 있게 됨-->
    <div class="float-left">float</div>
    <div class="float-right">float</div>
  </section>
  <!--해당 h1태그는 clearfix가 있지 않으면 float된 box 사이에 존재하게 됨
	  위 section에 대해서 clearfix가 적용되어 float 아래로 h1이 붙게되고, 
	  정상적으로 margin도 적용됨-->
  <h1>나는 밑에 있을래</h1>
</body>
```









### 다단 레이아웃 만들기 position & float & flex (수업내용)



##### 기본코드

>레이아웃이 되지 않은 형태
>
>아래 코드들을 `<style>` 가장 아래쪽에에 넣어서 사용 가능

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <style>
        body {
            margin: 0;
        }
        div, header, section, nav, article, footer {
          box-sizing: border-box;
        }
        /* Default style */
        header {
          height: 100px;
          background-color: bisque;
        }
        nav {
          width: 10vw;
          background-color: powderblue;
        }
        section {
          width: 90vw;
          background-color: rosybrown;
        }
        article {
            border: 1px solid black;
        }
        footer {
            background-color: silver;
        }
    </style>
</head>
<body>
  <header>
    헤더 영역입니다.
  </header>
  <div>
    <nav>
      네비게이션 영역입니다.
    </nav>
    <section>
      <article>
        <h2>Lorem</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsum, mollitia, totam iure eum facere dicta qui amet nobis voluptatem minus. Nihil minus officiis doloremque repellat quam veniam accusamus libero.</p>
      </article>
      <article>
        <h2>Lorem</h2>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus rem laboriosam cum sunt atque deserunt iste sed ea facere ex ipsam modi dolorem quos dignissimos necessitatibus neque excepturi, vitae tempora.</p>
      </article>
    </section>
  </div>
  <footer>
    푸터 영역입니다.
  </footer>
</body>
</html>
```





##### 1. flex를 이용하여 레이아웃 하기 (가장 좋은 방법, 추후 설명 예정)

```html
<style>
    /* flex는 추후 개념 설명 예정입니다. */
    div {
      display: flex;
    }
</style>
```



##### 2. float를 이용하여 레이아웃 하기

```html
 <style>
     /**/
    nav {
      float: left;
      height: 100%;
    }
    section {
      float: right;
    }
    footer {
      clear: both;
    }
    /* nav 높이가 맞지 않음.
    부모 요소에 배경만 하면 안됨. float -> 높이 0 */
    div {
      background-color: powderblue;
    }
    div:after {
      content: "";
      display: block;
      clear: both;
    }
</style>
```



##### 3. inline-block을 이용하여 레이아웃 하기(비추천)

```html
<style>
    nav, section {
      display: inline-block;
    }
    /* inline-block은 코드상의 공백으로 4px이 부여됨.
    아래의 방법은 100% 안전한 방법은 아님. (일부 브라우저/폰트의 경우 4px이 아닙니다.)
    소스코드를 </nav><section>으로 해도 되나, 코드 가독성이 떨어지는 단점이 있음.
    혹은 부모요소(div)의 폰트사이즈를 0으로 설정하고, 자식요소(nav/section)의 폰트사이즈를 부여하는 방법도 존재.(실제 이러닝 코드의 풀이 방법)
    다만, 이 방법도 부모 요소 영역에 다른 텍스트가 없을 때만 가능.
    이러한 레이아웃을 만들 때 inline-block을 사용시 주의!
     */
    nav, section {
      margin-right: -4px;
    }
    div {
      background-color: powderblue;
    }
    nav {
      vertical-align: top;
    }
  </style>

```



##### 4. position을 이용하여 레이아웃 하기

>  해당 경우에는 footer가 보이지 않음. 이는 footer가 현재 nav와 article에 가려져있는것. nav와 article의 배경색을 없에 확인가능

```html
<style>
    div {
      position: relative;
    }
    nav {
      position: absolute;
      top: 0;
      left: 0;
    }
    section {
      position: absolute;
      right: 0;
    }
</style>
```









flex

> flex속성들 보여주는 사이트: https://codepen.io/enxaneta/pen/adLPwv