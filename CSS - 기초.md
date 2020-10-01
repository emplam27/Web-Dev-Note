# 200310_CSS (의사 클래스 제외)



### html 파일 안에 css 작성

```html
<!DOCTYPE html>
<html>
    <head>
        <!-- 여기까지는 html 문법-->
        <style>
            /* <style>태그 안쪽은 css 문법 */
            h2{color:blue}
        </style>
        <!-- 다시 여기서부터 html 문법-->
    </head>
    <body>
        <h1 style="color:red">Hello World</h1>
        <h2>Hello World</h2>
    </body>
</html>
```

>`<head>`태그의 `<style>`태그 안쪽은 css문법으로 작성해야 함
>
>이외에 요소에서 style 속성을 지정할 수 있음







### 선택자(selector)와 선언(declaration)

>선택자 게임으로 연습하기 : https://flukeout.github.io/



#### 1. 타입 선택자

```html
<head>
    <style>
        li{
            /*HTML선택자*/
            color:red;
            text-decoration:underline;
        }
        #id_select{
            /*id 선택자*/
            font-size:50px;
        }
        .class_select{
            /*class 선택자*/
            color:blue;
            text-decoration:line-through;
        }
    </style>
</head>
<body>
    <h1 class="class_select">what we learn?</h1>
    <ul>
        <li>HTML</li> <!--HTML선택자 영향-->
        <li id="id_select">CSS</li> <!--id 선택자 영향-->
        <li class="class_select">JavaScript</li> <!--class 선택자 영향-->
        <li>Web Design</li> <!--HTML선택자 영향-->
        <li class="class_select">Frontend</li> <!--id 선택자 영향-->
    </ul>
</body>
```

>- css에서는 선택자(selector){선언(declaration)}의 형태를 사용
>  각 선언 뒤에는 `;`을 붙여 구분
>
>
>
>- HTML 선택자
>
>  위 상황에서는 `<li>`태그가 붙어있는 개체들에 대하여 `li{}`를 이용하여 속성값을 줌 
>
>  html요소를 이용하여 속성값을 주는 선택자
>
>
>
>- id 선택자
>
>  위 상황에서 `id`는 html 문법으로, `#di_select{}`는 "id_select"라는 `id`의 속성값
>  "di_selelct"라는 이름을 사용한 `id`에 `#di_select{}`를 이용하여 속성값을 준 것임 
>
>  id는 html문서에서 한번만 등장해야함 == 1가지 개체의 속성을 바꿀때만 사용
>
>  
>
>- class 선택자
>
>  위 상황에서 `class`는 html 문법으로, `#class_select{}`는 "class_select"라는 `class`의 속성값
>  "class_selelct"라는 이름을 사용한 `class`들에게 `#class_select{}`를 이용하여 속성값을 준 것임 
>
>  여러 개체의 속성을 바꿀때는 class를 사용해야함





#### 2. 고급 선택자

>선택자간의 관계를 이용하여 속성을 부여하는 방법



##### 하위 & 자손 선택자

```html
<head>
    <style>
        *{
            font-size:30px
        }
        
        ul li{
            /*ul 아래 li에 글자색 속성값을 선언*/
            color:red;
        }
        ol>li{
            /*ol의 직계자손 li에만 테두리 속성값을 선언*/
            border:1px solid red;
        }
        #asdf>li{
            /*asdf라는 id를 가진 개체의 직계자손 li에만 글자색 속성값을 선언*/
            color:blue;
        }
        ul, ol{
            /*문서 전체의 ul, ol 요소에 배경색 속성값 선언*/
            background-color:powderblue
        }
    </style>
</head>
<body>
    <h1>what is selector?</h1>
    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>Web Design</li>
        <li>Frontend</li>
    </ul>
    <ol id="asdf"> <!--아래 개체들은 모두 부모의 속성값을 상속받아 글자색이 변함-->
        <li>HTML</li>
        <li>CSS
            <ol>
            	<li>selecor</li>
                    <ol>
                        <li>HTML selector</li>
                        <li>id selector</li>
                        <li>class selector</li>
                    </ol>
                <li>declaration</li>
            </ol>
        </li>
        <li>JavaScript</li>
        <li>Web Design</li>
        <li>Frontend</li>
    </ol>
</body>
```

>- 선택자1 선택자2{선언}
>
>  선택자1 아래의 선택자2들 모두에게 속성값을 선언
>
>  꼭 한곳만 선택하는건 아님
>
>  ```html
>  <선택자1>
>      <선택자3>
>      	<선택자2>요소</선택자2>    
>      </선택자3>
>  </선택자1>
>  ```
>
>  해당 경우에도 선택자2 요소의 속성을 바꿀 수 있음
>
>  
>
>- 선택자1>선택자2{선언}
>
>  선택자1의 직계자손 선택자2들에게만 속성값을 선언
>
>
>
>- 선택자1, 선택자2{선언}
>
>  선택자1, 2 모두에게 속성값을 선언함
>
>  
>
>- *{선언}
>
>  문서 모든 태그에 속성값을 선언함
>
>  '선택자 *{선언}' 을 하게되면 앞 선택자 아래의 모든 선택자에 대해서 속성값을 선언
>





##### 인접 및 형제선택자

```html
<head>
    <style>
        h1+ul{
            /*h1의 인접형제관계인 ul만 글자색 속성값을 선언*/
            color:red;
        }
        h1~ol{
            /*h1의 형제관계인 다수의 ol에 테두리 속성값을 선언*/
            border:1px solid red;
        }
    </style>
</head>
<body>
    <h1>what is selector?</h1>
    <ul> <!--h1 다음에 나오는 인접형제관계의 ul요소이기 때문에 글자색이 바뀜-->
        <p>adjacent sibling selector</p>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>
    <ul> <!--ul요소지만 인접형제관계가 아니기 때문에 글자색이 바뀌지 않음-->
        <p>adjacent sibling selector</p>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>
    <h1>what is selector?</h1>
    <ol> <!--h1 다음에 나오는 형제관계의 ol요소이기 때문에 테두리가 바뀜-->
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ol>
    <ol> <!-- +와 다르게 1개로 제한되지 않음 -->
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ol>
    <p>general sibling selector</p>
    <ol> <!-- 끊어져도 상관없이 속성값이 선언됨 -->
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ol>
</body>
```

> - 선택자1+선택자2{선언}
>
>   선택자1 바로 다음에 오는 '인접'형제관계의 선택자2에게만  속성값을 선언
>
>   인접형제관계이기 때문에 1개의 개체만 영향을 받음
>   
>   
>
> - 선택자1~선택자2{선언}
>   
>   선택자1 다음에 오는 형제관계의 선택자2에게만  속성값을 선언
>   
>   인접형제관계가 아니기 때문에 다수의 개체가 영향을 받음
>







#### 3. 상속

> - 상속되는 속성들 : 
>   Text 관련요소(font, color, text-align, opacity, visibility 등)
>   
> - 상속되지 않는 속성들 : 
>   Box model 관련요소(width, height, margin, padding, border, box-sizing, display)
>   position 관련요소(position, top/right/ bottom/left, z-index 등)







#### 4. CSS의 우선순위

> 1) 중요도: important
>
> 2) 우선순위: inline속성 - id선택자 - class선택자 - 요소선택자
>
> 3) 소스순서

```html
<head>
  <style>
    h3 { color: violet !important}
    p { color: green; }
    .blue { color: blue; }
    .skyblue { color: skyblue; }
    #red { color: red; }
  </style>
</head>
<body>
  <p>1</p>
  <p class="blue">2</p>
  <!-- 3, 4는 class 부여순서가 아니라, 위에 정의된 순서! -->
  <p class="blue skyblue">3</p>
  <p class="skyblue blue">4</p>
  <p id="red" class="blue">5</p>
  <h3 id="red" class="blue">6</h3>
  <p id="red" class="blue" style="color: yellow;">7</p>
  <h3 id="red" class="blue" style="color: yellow;">8</h3>
</body>
```

>`1` : 요소 선택자인 p{}의 속성
>
>`2` : p{}(요소선택자) 보다 .blue{}(class선택자)의 우선순위가 더 크기 때문에 class선택자의 속성
>
>`3`, `4` : 모두 class로 blue와 skyblue를 가짐. 하지만 `<style>`에서 skyblue가 blue보다 나중에 선언되었기 때문에 두 경우 모두 .skyblue{}의 속성
>
>`5` : .blue{}(class선택자) 보다 #red{}(id선택자)의 우선순위가 더 크기 때문에 id선택자의 속성
>
>`6`, `8` : h3{}태그는 !important가 붙어있기 때문에 어떠한 우선순위보다도 가장 앞에 오게된다.
>
>`7` : #red{}(id선택자)와 .blue{}(class선택자) 보다 태그 안의 style=""(inline속성)의 우선순위가 더 크기 때문에 inline 속성 









### 표현 text & set



#### 1. 크기단위

##### px, em, rem

>- px : 절대단위, 폰크의 크기가 고정일 때
>- em, rem: 사용자가 페이지의 폰트를 가변적으로 변경할 수 있게 할 때 사용
>- 사용자가 글꼴 크기를 키웠을 때, px은 바뀌지 않고, rem은 바뀜. 주로 rem사용
>
>rem: 브라우저 기본 폰트크기의 배수로 설정된다. 1rem = 1 * 브라우져 기본 글꼴
>
>em: 자신에게 부여되거나, 상속받을 값을 기준으로 배수하여 설정된다. 
>상속받은 값이 24px일 때, 1.5em = 24*1.5 = 36px

```html
<head>
  <style>
    .em {
      font-size: 1.5em;
    }
    .rem {
      font-size: 1.5rem;
    }
  </style>
</head>
<body>
  <!-- ul 태그의 하위 요소들은 24px을 적용, 1.5rem = 16px(root) * 1.5 = 24px-->
  <ul class="rem">
    <li>no class</li> <!--24px, font-size는 기본적으로 부모의 값을 상속-->
    <li class="em">1.5em</li><!--24(상속) * 1.5 = 36px-->
    <li class="rem">1.5rem</li> <!--root를 기준, 부모랑 상관 없이 24px-->
  </ul>
</body>
```



##### vh, vw, vmin, vmax

>- vh : 높이를 기준으로 (확인을 해보고 싶다면, 브라우저 높이를 조정 해보세요.)
>
>- vw : 너비를 기준으로 (확인을 해보고 싶다면, 브라우저 너비를 조정 해보세요.)
>
>  - 예) 10vh -> 전체 높이의 크기의 10%
>
>- vmin : 높이/너비 중에 작은 것 기준으로
>
>- vmax : 높이/너비 중에 높은 것 기준으로
>
>    - 예) 높이 720px, 너비 1080px 일때, 10vmin이면, 72px

```html
<head>
  <style>
    .vh {
      font-size: 5vh;
    }
    .vw {
      font-size: 5vw;
    }
    .vmin {
      font-size: 5vmin;
    }
  </style>
</head>
<body>
  <p class="vh">높이에 따라 글씨 크기가!</p>
  <p class="vw">너비에 따라 글씨 크기가!</p>
  <p class="vmin">높이랑 너비중에 작은 것을 기준으로</p>
</body>
```







#### 2. 폰트

```html
<style>
    selector{
                font-size: 속성값;
                font-family: 폰트1, 폰트2, 폰트3... 폰트속성값1, 폰트속성값2 ;
                font-weight: 속성값
                line-height: 
                }
</style>

```

>- `font-size` : px, em, rem을 사용
>- `font-family` : 
> 	1. 브라우저에 폰트1이 없을 경우 폰트2를, 폰트2가 없을 경우 폰트 3을... 표시한다.
> 	2. 폰트의 속성값을 뒤에 붙여줘야 한다. 
>    `serif`(장식있음), `sans-selif`(장식없음), `cursive`(흘림), `fantasy`, `monospace`
>- `font-weight` : 글자의 굵기 (`bold`, `bolder`, `lighter`, `100~900`, `normal` 사용)
>- `font-style`: 글자의 모양 (`italic`, `oblique`, `normal` 사용) 
>- `line-height` : 글자 크기의 배수만큼 줄간격(기본값은 1.2), 2 = (기본글자크기 * 2)의 줄간격
>- 이외 `letter-spacing`, `word-spacing`, `font-weight` 등 사용가능

​	





#### 3. 배경

```html
<style>
    selector{
        height: 500px;
        border: 1px solid black;
        background-color: tomato;        
    }
</style>
```

>- `background-color` : 배경 이미지 설정
>- `background-image` : 배경 이미지 설정, 기본적으로 반복으로 설정
>
>- `background-repeat`: 배경 이미지 반복 설정, `repeat`, `no-repeat`,  `repeat-x`, `repeat-y`
>- `background-attachment` : 배경 이미지 고정 설정, `fixed`, `scroll`
>- `background-position` : 배경 이미지 위치 설정, `center`, `right`, `left`, `top`, `bottom`
>- `background-size` : 배경 이미지 크기 설정, `100px 200px`, `contain`, `cover`
>
>







#### 4. 컬러

```html
<style>
    selector { color: 속성값 }
</style>
```

>- colorname: 명시적인 이름을 사용 `red`, `blue`, `black`...
>- hex: 16진수 사용 `#000000` ~ `#FFFFFF`
>- rgb: 10진수 사용 `rgb(0,0,0)` ~ `rgb(255, 255, 255)`









### 표현: inline & block & box

>일반적으로
>
>- 요소의 높이 설정 해주지 않으면, 일반적으로 컨텐츠 혹은 자식의 크기만큼 가진다.
>- 요소의 너비는 설정 해주지 않으면, 일반적으로 부모의 크기만큼 가진다.

```html
<head>
  <style>
    div {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .w-100 {width: 100px;}
    li {margin: 10px 0;}
    .div-bg {background-color: orange;}
  </style>
</head>
<body>
    <li>요소의 높이 설정 해주지 않으면, 일반적으로 컨텐츠 혹은 자식의 크기만큼 가진다.</li>
    <div></div><!-- 요소의 높이를 설정해주지 않아 컨텐츠의 크기만큼 높이를 가짐 -->
    <span></span> <!-- 요소의 높이를 설정해주지 않아 컨텐츠의 크기만큼 높이를 가짐 -->
    <li>요소의 너비는 설정 해주지 않으면, 일반적으로 부모의 크기만큼 가진다.</li>
    <div class="w-100">
        <!-- 요소의 너비를 설정해주지 않아 부모요소의 너비만큼 너비를 가짐 -->
        <div class="div-bg">너비 확인</div>
    </div>
</body>
```





#### 1. display 설정 : 블록 & 인라인 (시험)

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





##### 블록 요소의 속성 

>- 블록요소는 너비, 높이, 마진 등 자유롭게 부여 가능
>- `margin-left`, `margin-right` 등 사용시 `: auto`를 주게되면 자동으로 마진을 할당함
>- 가운데 정렬을 하기 위해서는 `margin-left: auto`, `margin-left: auto` 같이 사용

```html
<head>
    <style>
        .square {
          box-sizing: border-box;
          width: 200px;
          height: 200px;
          border: 1px solid black;
          background-color: #9775fa;
          color: white;
        }
        .margin-left-auto {
          margin-left: auto;
        }
        .margin-right-auto {
          margin-right: auto;
        }
    </style>
</head>
<body>
    <h3>1. 블록 요소의 너비/마진</h3>
    <!-- 너비를 지정하지 않아 좌우 100%를 너비로 사용, margin 할당 없음-->
    <div class="div-bg">일반적으로 너비의 100%</div> 
    <!-- 너비를 지정하게 되면, 기본적으로 우측으로 margin을 할당 -->
    <div class="square">너비 지정하면 오른쪽에 자동으로 margin</div>
    
    <h3>2. 블록의 수평 정렬</h3>
    <div class="square margin-right-auto">오</div>
    <div class="square margin-left-auto">왼</div>
    <div class="square margin-left-auto margin-right-auto">가운데</div>
    
    <p>아래의 div는 가운데로 정렬되지 않음</p>
    <!--div에 너비가 주어지지 않아 전체영역을 컨텐츠가 차지하고 있어서,margin 없음-->
    <div class="div-bg margin-left-auto margin-right-auto">가운데 정렬되지 않음</div>
</body>
```





##### 인라인 요소의 속성

> - 인라인 요소는 너비, 높이, 마진상하를 부여할 수 없음, 일반적으로 content 영역만큼의 너비를 가짐
> - 정렬을 위해 `text-align:`, `center`, `right`, `left` 사용, 모든 인라인 요소에 적용됨(텍스트, 이미지 등)

```html
<head>
  <style>
    .w-100 {width: 100px;}
    .div-bg {background-color: orange;}
    .span-bg {background-color: orange;}
    .margin-top-10 {margin-top: 10px;}
    .text-right {text-align: right;}
    .text-left {text-align: left;}
    .text-center {text-align: center;}
  </style>
</head>
<body>
    <h3>1. 인라인 요소의 너비</h3>
    <li>너비, 높이, 마진상하를 부여할 수가 없고, 컨텐츠 영역만큼만 가로를 차지함.</li>
    <!--너비와 마진상하를 지정하였으나, 인라인 요소이므로 적용 안됨-->
    <span class="span-bg">너비 확인</span>
    <span class="w-100 span-bg">너비 확인</span>
    <span class="margin-top-10 span-bg">마진 확인</span>
    
    <h3>2. 인라인 요소의 수평정렬</h3>
    <li>부모 요소에 text-align을 부여</li>
    <!-- 아래를 개발자 도구로 찍어보세요! -->
    <div class="div-bg text-right">
      <span>오</span>
    </div>
    <div class="div-bg text-left">
      <span>왼</span>
    </div>
    <div class="div-bg text-center">
      <span>가운데</span>
    </div>
    <p>text-align이지만, 텍스트 뿐만 아니라 모든 인라인 요소 정렬을 한다.</p>
    <div class="div-bg text-center">
      <img src="https://picsum.photos/200/300" alt="랜덤이미지">
    </div>
</body>
```





##### margin 상쇄

>- 형제간, 부모자식간 `margin-top`, `margin-bottom` 등으로 겹치게 될 경우, 큰쪽의 마진만 적용되는 현상
>- 시각적 효과가 있는 요소의 경우에는 시각적 효과를 기준으로 위, 아래 마진이 형성된다.
>- 시각적 효과가 없는 요소의 경우에는 위, 아래 요소중에 큰 값을 위, 아래의 마진으로 갖는다.(pass)
>  (https://www.youtube.com/watch?v=WwSV74r2f24&list=PLuHgQVnccGMDaVaBmkX0qfB45R_bYrV62&index=30)

```html
<head>
  <style>
    .mb-1 {margin-bottom: 1rem;}
    .my-3 {
      margin-top: 3rem;
      margin-bottom: 3rem;
    }
    .border {border: 1px solid black;}
  </style>
</head>
<body>
  <div>
    <!--아래 div요소의 margin-top 때문에 윗 div요소의 margin-bottom이 상쇄-->
    <div class="mb-1">mb-1</div>
    <div class="my-3">my-3</div>
  </div>
</body>
```









#### 2. 박스모델

> - `content` : 주요 내용이 들어가는 부분
> - `padding` : content와 border 사이의 여백
>   `pading-left` `pading-right` `pading-top` `pading-down`으로 개별설정, 나열식 설정 가능(그림)
> - `border` : box의 테두리
>   `border-width`, `border-style`, `border-color` 등을 적용 가능, 축약: `border: 10px solid red`
> - `margin` : border 바깥쪽의 여백
>   `margin-left` `margin-right` `margin-top` `margin-down`으로 개별설정, 나열식 설정 가능
>   - `selector{margin: 10px;}` : 상하좌우 10px 
>   - `selector{margin: 10px 20px;}` : 상하 10px, 좌우 20px 
>   - `selector{margin: 10px 20px 30px;}` : 상 10px, 좌우 20px, 하 30px 
>   - `selector{margin: 10px 20px 30px 40px;}` : 상 10px, 우 20px, 하 30px, 좌 40px (시계방향) 





##### box-sizing

>- `width`, `height` : 블록 레벨 요소의 너비와 높이, **인라인 레벨 요소에는 적용 안됨(중요)**
>- 기본적으로 box-sizing는 content-box의 사이즈, `width`, `height` 는 **content의 사이즈**
>- border까지 box-sizing을 늘리고 싶다면 `box-sizing: border-box;` 추가

```html
<head>
  <style>
    div {
      /* 기본 div의 box-sizing은 content-box*/
      width: 100px;
      margin: 10px auto;
      padding: 20px;
      border: 1px solid black;
      background-color: #9775fa;
      color: white;
      text-align: center;
    }
    .border-box {
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <div>content-box</div> <!--박스 너비 : content(100) + padding(20*2) + border(1*2)-->
  <div class="border-box">border-box</div> <!--border까지 박스 너비: 100-->
</body>
```





##### margin & padding 초기화

>주로 `*{ box-sizing: border-box}`, `*{margin: 0; padding: 0;}`를 사용

```html
<style>
    *{
        box-sizing: border-box;
    }
    *{
        margin: 0; 
        padding: 0;
    }
</style>
```









