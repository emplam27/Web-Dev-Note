# Vue 정리

>  공식문서 : https://vuejs.org/



[TOC]





### :bulb:SPA & MVVM

> - Single Page Application
>   - 화면의 요소가 바뀌더라도 JS를 이용한 동적인 처리로 html을 하나밖에 쓰지 않는 어플리케이션
>   - SPA은 웹 어플리케이션에 필요한 모든 정적 리소스(HTML, CSS 등)를 한번에 받고 이후부터는 페이지 갱신에 필요한 데이터(XML, JSON 등)만 전달 받음
> - Model - View - ViewModel
>   - 데이터 - HTML(DOM) - Vue 인스턴스의 데이터와 HTML이 바인딩 되어있는 상태
>   - Vue.js에서 말하는 ‘반응형’이라는 것은 데이터가 변경되면 이에 반응하여 연결된 DOM이 업데이트 되는 것을 의미





### :bulb::bulb::bulb:Vue의  콜백함수 this

> **JS의 콜백함수 this**
>
> - Callback 함수로서 function 키워드로 선언한 함수의 this는 window를 가르킨다. 
>   (addEventListener 제외)
> - arrow function의 this는 해당 함수를 호출하는 함수의 this를 가르킨다.
>
> 
>
> **Vue의 콜백함수 this**
>
> - Vue 함수에서 arrow function으로 선언되지 않은 함수가 호출하는 this는 vue instance를 가르킨다.
> - 콜백함수에서는 대부분 arrow function을 사용하는 이유이다.





## 1. 기본구조

> - 새로운 `Vue` 객체를 만들어 주면서 시작. 속성은 기본적으로 `el`, `data` 등을 가지고 있음
>   - `el`을 통해 vue로 관리될 부분을 정함
>   - html에 보여지는 부분은 모두 `data`를 통해 가져옴
> - `{{ interpolation }}`을 활용하여 출력하는데, 속성값으로는 활용하지 않는다. 속성값을 조작할 경우에는 v-bind 디렉티브로 활용

```html
<body>
  <!-- vue를 시작하고자 하는 부분을 지정: id="app" -->
  <div id="app">
    <!-- 속성이 아닌 경우에는 {{ data.key }}를 통해 연동-->
    <h1>{{ message }}</h1>  <!-- interpolat -->
    
    <!-- v-bind: 뷰의 data와 태그의 속성을 연동 -->
    <span v-bind:id="spanid" v-bind:title="message1">
      내 위에 잠시 마우스를 올리면 동적으로 바인딩 된 title을 볼 수 있습니다!
    </span>
  </div>

  <!-- Vue.JS CDN -->
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',  // Vue를 시작하고자 하는 태그의 id
      data: {
        message: '안녕하세요, Vue!',
        message1: '이 페이지는' + new Date() + '에 로드 되었습니다.',
        spanid: 'text'
      },
    })
  </script>
```





### (1) Directive

> 디렉티브는 `v-` 접두사가 있는 특수 속성입니다. 디렉티브 속성 값은 **단일 JavaScript 표현식** 이 됩니다. (나중에 설명할 `v-for`는 예외입니다.) 디렉티브의 역할은 표현식의 값이 변경될 때 사이드이펙트를 반응적으로 DOM에 적용하는 것 입니다.



#### v-text & v-html

> 태그의 텍스트를 부여하는 속성
>
> [https://medium.com/@hozacho/%EB%A7%A8%EB%95%85%EC%97%90-vuejs-005-vuejs-directive-v-html-f221dd096d6a](https://medium.com/@hozacho/맨땅에-vuejs-005-vuejs-directive-v-html-f221dd096d6a)

```html
<span v-text="msg"></span>
<!-- 위, 아래는 같은 값 -->
<span>{{ msg }}</span>
```



#### v-if, v-else-if, v-else

```html
<!-- v-if: if문 사용, ! 사용 가능 -->

<p v-if="number > 0">양수</p>
<p v-else-if="number < 0">음수</p>
<p v-else>0</p>
```



#### v-for

> `v-for`만 파이썬 for 문법과 동일
>
> v-for가 v-if 보다 높은 우선순위를 갖는다.

```html
<!-- v-for: for문 사용, {{}}로 인자 넘기기 가능 -->

<ul>
    <li v-for="number in numbers">{{ number + 1 }}</li>
</ul>

<ol>
    <li v-for="teacher in teachers">{{ teacher.name }}</li>
</ol>
```



#### :bulb:v-on ( `@` )

> 요소에 이벤트 리스너를 추가하는 속성, 줄여서 `@`로 사용

```html
<!-- v-on: 이벤트리스너 추가, method 작동 가능 -->

<!--     
button .addEventListener('click',   cb)
<button v-on:             click=  "alertWarning">Alert Warning</button> 
-->
<button v-on:click="alertWarning">Alert Warning</button>
<button v-on:click="alertMessage">Alert Message</button>
<!-- v-on: 을 줄여서 @ 으로 쓸 수 있다.-->
<button @click="changeMessage">Change Message</button>
<input @keyup.enter="onInputChange" type="text">

```



#### :bulb:v-bind ( `:` )

> Vue 객체 안에있는 data의 요소들과 단방향 바인딩(input => data)하는 속성, 줄여서 `:`로 사용가능

```html
<!-- data 안에있는 인스턴스와 바인딩(연동)할 수 있게 함 -->

<div id="app">
    <a href="{{ googleUrl }}">Bad Google link</a>
    
    <!-- v-bind:표준속성 => 표준 HTML 속성과 Vue 인스턴스를 연동할 때. (+a) -->
    <a v-bind:href="googleUrl">Good Google link</a>
    
    <!-- v-bind: 을 줄여서 : 으로 쓸 수 있다.-->
    <a :href="naverUrl">Naver link</a>
    <img :src="randomImageUrl" :alt="altText">
</div>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const app = new Vue({
        el: '#app',
        data: {  
            googleUrl: 'https://google.com',
            naverUrl: 'https://naver.com',
            randomImageUrl: 'https://picsum.photos/200',
            altText: 'random-image',
        }
    })
</script>
```



#### :bulb:v-model

> data의 요소들과 양방향 바인딩(input <=> data)하는 속성
>
> 주로 `input`, `select`, `textarea`으로 데이터를 넣을 때 양방향 바인딩 활용

```html
<div id="app">
    <h1>{{ message }}</h1>
    <!-- 사용자 입력 <=> data 를 완전히 동기화 시키고 싶다. -->
    <!-- v-model => input, select, textarea 에 양방향 바인딩 -->
    v-model/2way: 
    <input v-model="message" type="text">
    <hr>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {message: 'hi'},
    })
  </script>

```



#### v-show

> boolean값을 속성으로 가지며, true일 경우 표시, false일 경우 표시하지 않음
>
> - `v-if="false"`를 이용하여 요소를 숨길경우: 코드가 없음, 보여줘야할 때 렌더링 진행
> - `v-show="false"`를 이용하여 요소를 숨길경우: 주석으로 바뀜, 렌더링은 하되 보여주지만 않음

```html
<div id="app">
    <button @click="changeF">changeF</button>
    
    <!-- v-if 는 평가(t/f)가 자주 바뀌지 않을때 유리하다 => 초기 렌더링 코스트가 적다. -->
    <p v-if="t">This is v-if with true</p>
    <p v-if="f">This is v-if with false</p>

    <!-- v-show 는 평가(t/f)가 자주 바뀔때 유리하다 => 토글 코스트가 적다. -->
    <p v-show="t">This is v-show with true</p>
    <p v-show="f">this is v-show with false</p>
    
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    const app = new Vue({
      el: '#app',
      data: {
        t: true,
        f: false,
      },
      methods: {
        changeF() {
          this.f = !this.f
        }
      }
    })
  </script>

```





### (2) methods

> Vue 객체의 속성으로, `v-on`(이벤트 리스너)등에 수행할 메서드들을 지정

```html
<script>
    const app = new Vue({
        el: '#app',
        data: {  
            message: 'Hello Vue'
        },
        methods: {
            alertWarning: function () {
                alert('WARNING')
            },
            alertMessage () {  // Syntactic Sugar: 위와 아래는 완전히 같습니다.
                alert(this.message)
            },
            changeMessage() {
                this.message = 'CHANGED MESSAGE'
            },
        }
    })
</script>
```





### (​3) :bulb:computed

> - 변수처럼 활용되서 DOM이 rerender되더라도 재실행이 일어나지 않는 캐싱용 함수들
>
>   (함수라면 DOM이 rerender되면 재실행 됨), Vue console보면 값으로서 활용되는 것을 볼 수 있음
>
> - Data 를 Create Update Delete 하지 않고, Read(return) 하는 함수들 ( = SQL WHERE)
>
> -  함수지만, 이름은 명사형으로 지음

```html
<body>
  <!-- 여기에 코드를 작성하시오 -->
  <div id="app">
    <select v-model="status">
      <option value="all">전체</option>
      <option value="inProgress">진행중</option>
      <option value="completed">완료</option>
    </select>

    <ul>
      <li v-for="todo in filterdTodoList" v-bind:key="todo.id">
        <input type="checkbox" v-model="todo.completed">
        <span :class="{completed: todo.completed}">{{ todo.content }}</span>
      </li>
    </ul>
    ...

  <!-- Vue CDN -->
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    // 여기에 코드를 작성하시오
    const app = new Vue({
      el: '#app',
      data: {
        status: 'all',
        newContent: '',
        todoList: [...]
      },
      methods: {...}, 
      // Create, Update, Delete를 사용하지 않고, Read만 사용할 때 사용
      computed: {
        // 함수처럼 활용x, 함수라면 DOM이 rerender되면 재실행 됨
        // 변수처럼 활용, 변수처럼 활용되서 DOM이 rerender되더라도 재실행이 일어나지 않음
        // Vue console보면 값으로서 활용되는 것을 볼 수 있음. 캐싱!
        filterdTodoList: function () {
          switch (this.status) {
            case 'completed': {
              return this.todoList.filter(todo => todo.completed)
            } 
            case 'inProgress': {
              return this.todoList.filter(todo => !todo.completed)
            } 
            default: {
              return this.todoList
            }
          }
        },
      },
    })
  </script>
```





### (4) watch 

> **어떤 데이터를 특정**하고, 그 데이터가 **변화가 일어나면** 특정 함수를 실행한다. **감시자**역할

```js
watch: {
    data_name: function () {} // 해당 데이터만 변경이 일어날 경우
}
```







## 2. Life Cycle Hook

>  [https://kr.vuejs.org/v2/guide/instance.html#%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8](https://kr.vuejs.org/v2/guide/instance.html#라이프사이클-다이어그램)
>
> **HTML 이 Vue 인스턴스와 연결된 순간부터(div#app 에 포함된 순간부터), Life cycle hook 의 영향을 받는다.** 



<img src="https://kr.vuejs.org/images/lifecycle.png" style="zoom: 33%;" />



#### created

> 초기화 이후 AJAX 요청을 보내기 좋은 시점(Data, Methods 에 접근 가능.)



#### mounted

> DOM 과 Vue 인스턴스가 연동이 완료되고 난 이후에 실행할 일들.



#### updated

> data({}) 가 바뀌고 나서, 화면이 다시 렌더되면 반복적으로 실행



#### ex) scrollmonitor API 활용

```html
<body>
    <div id="app">
        <div v-for="photo in photos">
            <h5>{{ photo.title }}</h5>
            <img :src="photo.thumbnailUrl" :alt="photo.title">
        </div>
        <button @click="scrollToTop" class="button-bottom">^</button>

        <!-- HTML 이 Vue 인스턴스와 연결된 순간부터(div#app 에 포함된 순간부터), 
			 Life cycle hook 의 영향을 받는다. -->
        <div id="bottomSensor"></div>
    </div>


    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/scrollmonitor/1.2.0/scrollMonitor.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const app = new Vue({
            el: '#app',
            data: {
                photos: [],
                page: 1,
            },

            methods: {
                getPhotos: function () {
                    const options = {
                        params: {
                            _page: this.page++,
                            _limit: 3,
                        }
                    }
                    axios.get('https://jsonplaceholder.typicode.com/photos', options)
                        .then(res => {
                        // console.log('>>> GET PHOTOS <<<')
                        this.photos = [...this.photos, ...res.data]
                    })
                        .catch(err => console.error(err))
                },

                addScrollWatcher: function () {
                    const bottomSensor = document.querySelector('#bottomSensor')
                    const watcher = scrollMonitor.create(bottomSensor)
                    // watcher 가 화면에 들어오면, cb 하겠다.
                    watcher.enterViewport(() => {
                        setTimeout(() => {
                            this.getPhotos()
                        }, 500)
                    })
                },

                scrollToTop: function () {
                    scroll(0, 0)
                },

                loadUntilViewportIsFull: function () {
                    const bottomSensor = document.querySelector('#bottomSensor')
                    const watcher = scrollMonitor.create(bottomSensor)
                    if (watcher.isFullyInViewport) {
                        this.getPhotos()
                    }
                },
            },

            // created: 초기화 이후 AJAX 요청을 보내기 좋은 시점(Data, Methods 에 접근 가능.)
            created: function () {
                this.getPhotos()
            },

            // mounted: DOM 과 Vue 인스턴스가 연동이 완료되고 난 이후에 실행할 일들.
            mounted: function() {
                this.addScrollWatcher()
            },

            // updated: data({}) 가 바뀌고 나서, 화면이 다시 렌더된 이후,
            updated: function() {
                this.loadUntilViewportIsFull()
            },
        })
    </script>
    <!-- .concat(), spread, push+spread benchmark
https://www.measurethat.net/Benchmarks/Show/4223/0/array-concat-vs-spread-operator-vs-push 
-->
</body>

```











## 3. Vue CLI 사용

> **공식문서: https://cli.vuejs.org/**
>
> 각 컴포넌트 별로 작업해서 결국 하나로 합치게 됨



#### vue cli 설치

```bash
$ npm install -g @vue/cli
```



#### vue 프로젝트 시작

```bash
$ vue create project_name
```



#### vue 서버 열기

```bash
$ npm run serve
```





### Vue CLI의 구조와 컴포넌트



### :star::star::star:data는 함수로



#### 최상단 App.vue

> - Vue의 SPA에서 최상단인 `App.vue`를 시작으로 각 기능별로 컴포넌트들이 추가되는 트리형태의 구조를 가지고 있다. 하나의 **정적 페이지 역할**을 수행한다.
>   - 각 컴포넌트를 불러올때는 `<컴포넌트 이름>`를 통해 불러온다.
>   - `<template>`의 최상단 태그는 하나밖에 될 수 없다.
>   - **SFC(Single File Component)에서는 data는 무조건 함수로 형성하여 반환해줘야 한다.**

```html
<template>
  <div id="app">
    <!-- 조건부 렌더링 -->
    <button @click="setPage('index')">Index</button>
    <button @click="setPage('lunch')">Index</button>
    <button @click="setPage('lotto')">Index</button>
    <!-- 각 컴포넌트를 불러올때는 <컴포넌트 이름>를 통해 불러온다. -->
    <Index v-if="page === 'index'" />
    <Lunch v-if="page === 'lunch'" />
    <Lotto v-if="page === 'lotto'" />
  </div>
</template>

<script>
import Index from './components/Index'
import Lunch from './components/Lunch'
import Lotto from './components/Lotto'

export default {
  name: 'App',
  components: {
    Index,
    Lunch,
    Lotto,
  },
  data: function () {
    return {
      page: 'index',
    }
  },
  methods: {
    setPage: function (page) {
      this.page = page
    }
  }
}
</script>

<style></style>
```



#### 컴포넌트

> - `App.vue`의 각 **기능들을 수행하는 부분**이며, 위에서 배운 Vue와 같은 형상은 이곳에서 활용된다.
>   - export default에 `name`을 기본적으로 가지며,`<templates>`의 최상단 태그 역시 1개여야만 한다. 
>
> 













## 4. Vue Router 사용

> **공식문서: https://router.vuejs.org/kr/**
>
> url을 이용해 **요청을 보내지 않고** DOM조작을 통해 각 컴포넌트를 보여줘 SPA에 로드한 기능들을 활용할 수 있음.

```bash
$ vue add router
```





### (1) router



#### App.vue: router-link

> 해당 태그가 눌렸을 때, 어떤 URL로 컴포넌트를 요청할 것인지 지정하는 부분

#### App.vue: router-view

> `router-link`를 통해 불러온 컴포넌트가 렌더링되는 부분

```html
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link> |
      <router-link :to="{ name: 'Ping' }">Ping</router-link>
    </div>
      
    <!-- 여기에 컴포넌트 렌더링 -->
    <router-view/><!-- ~= block content -->
  </div>
</template>

```





#### router/index.js

> - url에 따라 랜더링할 페이지와 컴포넌트를 결정하는 부분,  **Django 의 urls.py와 같은 역할**
> - `views/` 있는 Component 들은, `router/index.js` 로 가서 import합니다.

```js
// 1. import
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
import Lunch from '@/views/Lunch.vue'
import Lotto from '@/views/Lotto.vue'


Vue.use(VueRouter)

// 2. 등록: 랜더링 url관리는 이곳에서
const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/lunch',
    name: 'Lunch',
    component: Lunch,
  },
  {
    path: '/lotto',
    name: 'Lotto',
    component: Lotto,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
```





### (2) view

> - **각 컴포넌트를 모아서 보여주는 페이지. 컴포넌트들을 view에 모으고, view를 모아서 app으로 보여준다.**
> - 각 기능을 하는 렌더링 컴포넌트들
> - 직접 기능을 작성해도 괜찮고, 다른 컴포넌트들을 불러와서 사용해도 괜찮다.
> - 컴포넌트 기본구조를 따른다.





#### variable routing 사용법



**router/index.js**

> `path:`에 URL을 지정할 때 `'/...sample_url/:변수명'`으로 지정한다. 

```js
const routes = [
  ...
  { path: '/hello/:name', name: 'HelloName', component: HelloName },
  ...
]
```



**views/component.vue**

> `data`에서 URL에 지정한 변수를 받아서 사용한다.
>
> - 데이터를 받을 때: 
>   - data를 통해 받음
>   - `this.$route.params.변수` 또는 `this.$route.query.변수` (정확한건 콘솔로 확인)
> - 데이터를 보낼 때: 
>   - methods를 통해 보냄
>   - `this.$router.push('/컴포넌트 이름?변수명=${값}')`
>   - `this.$router.push({ name: '컴포넌트 이름', query: { 변수명: 값 } })`













## 5. :bulb::bulb::bulb:컴포넌트간 데이터 전송

> 상위 컴포넌트와 하위 컴포넌트는 데이터를 **단방향**으로 보낸다.
>
> - 상위 => 하위: **태그의 속성, props**
> - 하위 => 상위: **emit을 통한 이벤트 발생**

<img src="https://kr.vuejs.org/images/props-events.png" style="zoom: 50%;" />





### 상위 ➡️ 하위: 바인드한 태그속성 & props

> - 상위 컴포넌트가 하위 컴포넌트에게 데이터를 넘길때는 **태그의 속성을 바인드**하여 보내줌
> - 하위 컴포넌트에서 `props`를 통해 받은 데이터의 속성을 부여하고, 사용함
> - `props`: 컴포넌트 간에 데이터를 전달할 수 있는 컴포넌트 통신방법. **상위컴포넌트에서 하위 컴포넌트로 내려온 데이터 속성**

```html
<!-- 상위 컴포넌트: 바인딩된 속성을 이용하여 데이터를 넘겨준다. -->

<template>
  <div id="app">
    <하위_컴포넌트 :넘겨줄_데이터="넘겨줄_데이터"/>
  </div>
</template>
    

<!-- 하위 컴포넌트: props에서 데이터를 넘겨받아 사용한다. -->
<script>
import 하위_컴포넌트 from '경로'
    
export default {
  ...
  components: {
      하위_컴포넌트,
  }
  props: {
    넘겨받은_데이터: {
      type: 자료형(Object, Array, String...), // data의 자료형을 규정할 수 있음
      required: true/false, // 데이터가 들어가지 않을경우 오류를 내보내는 속성
    },
  },
}
</script>
```







### 하위 ➡️ 상위: $emit

> - `emit`: 하위 컴포넌트에서 상위컴포넌트로 **데이터를 보내는 특정 이벤트 발생**
> - 상위 컴포넌트에서는 **특정 이벤트리스너를 통해 데이터를 수정하는 메서드를 실행**하므로써 데이터를 수정

```html
<!-- 하위 컴포넌트: 넘겨줄 데이터와 함께 특정 이벤트를 발생시킨다. -->

<html태그 @발생_이벤트="$emit('이벤트_이름', 넘겨줄_인자들... )" >
    

<!-- 상위 컴포넌트: 이벤트 이름으로 받아서 메서드를 실행한다. 
	넘겨받은 데이터는 메서드의 인자로 받느다. -->
<하위_컴포넌트 @이벤트_이름="실행할_메서드" />
    ...
<script>
export default {
  ...
  methods: {
    실행할_메서드(넘겨받은_인자) {
        // 데이터를 수정하는 로직
    }
  },
} 
</script>
```





#### ex) Todolist

```html
<!-- @/views/TodoView.vue -->

<template>
  <div>
    <!-- add-todo라는 이벤트 요청이 들어왔으므로, 이벤트리스너를 통해 메서드를 실행 -->
    <TodoInput @add-todo="onAddTodo"/>
      
    <!-- 상위 컴포넌트가 하위 컴포넌트에게 데이터를 넘길때는 속성을 바인드하여 보내줌 -->
    <!-- checked라는 이벤트 요청이 들어왔으므로, 이벤트리스너를 통해 메서드를 실행 -->
    <TodoList @checked="onChecked" :todoList="todoList"/>
  </div>
</template>

<script>
import TodoInput from '@/components/TodoInput'
import TodoList from '@/components/TodoList'


export default {
  name: 'TodoView',
  components: {
    TodoInput, 
    TodoList
    // key, value값이 같아서 사용가능. 원래는
    // 'TodoInput': TodoInput,
    // 'TodoList': TodoList,
  },
  data() {
    return {
      todoList: [...]
    }
  },
  methods: {
    onChecked(todo) {
      todo.isCompleted = !todo.isCompleted
    },
    onAddTodo(todo) {
      this.todoList = [...this.todoList, todo]
    }
  },
}
</script>



<!-- @/component/TodoList.vue -->

<template>
  <div>
    <h1>TodoList</h1>
    <ul>
      <li v-for="todo in todoList" :key="todo.id">
        <!-- 하위 컴포넌트에서 상위 컴포넌트의 데이터를 수정할 수 없으므로, v-model 사용 못함
            따라서 상위 컴포넌트에 데이터 수정을 요청하는 이벤트를 보내서 상위 컴포넌트가 바꾸게 함
            $emit: 특정 이벤트를 발생 -->
        <input type="checkbox" 
          :checked="todo.isCompleted"
          @click="$emit('checked', todo)"
        >
        <span :class="{ completed: todo.isCompleted }">{{ todo.content }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  // 상위 컴포넌트에서 받은 데이터는 props에서 받는다.
  props: {
    todoList: {
      type: Array, 
      required: true,
    }
  },
}
</script>

<style>
  .completed {text-decoration: line-through;}
</style>
```







## 6. Vuex

https://vuex.vuejs.org/kr/

**상태 관리 패턴 + 라이브러리**



### (1) 설치

> src/store.js가 추가됨

```bash
$ vue add vuex
```





### (2) scr/store.js

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // data의 집합(중앙 관리 할 모든 데이터 === 상태)
  },
  mutations: {
    // state 를 변경하는 함수들
	//(mutations 에 작성되지 않은 state 변경 코드는 모두 동작하지 않음.)
    // 모든 mutation 함수들은 동기적으로 동작하는 코드여야 함
    // commit 을 통해 실행함. 
  },
  
  actions: {
    // 범용적인 함수들. mutations 에 정의한 함수를 actions 에서 실행 가능.
	// 비동기 로직은 actions 에서 정의.
    // dispatch 를 통해 실행함
  }
  },
  modules: {
  },
  // getters 추가
  getters: {
    // state 를 (가공해서)가져올 함수들. === computed
  }
})

```



#### state

> 상태라고 부르며, data의 집합, 중앙 관리 할 모든 데이터

```js
  state: {
    selectedVideo: None,
  },
```



#### mutations

> state(중앙 관리하는 데이터)를 변경하는 함수들

- **mutations에 작성되지 않은 state 변경 코드는 모두 동작하지 않는다.**
- 모든 mutations 함수들은 동기적으로 동작하는 코드여야 한다.
- 모든 mutations 함수들은 state를 인자로 받아 state에 접근할 수 있다.
- `$store.commit('함수명')`을 통해 실행한다.

```js
  mutations: {
    setSelectVideo(state, 인자) {
        // payload에 this.video를 넘겨받는다.
        state.selectedVideo = 인자
    }
  },
      
      
// 컴포넌트에서 mutations안의 함수를 실행할때는 &store.commit을 사용한다.
  methods: {
    onVideoSelect() {
      this.$store.commit('setSelectVideo', this.video)
    }
  }
  
```



#### actions

> 범용적인 함수들. mutations 에 정의한 함수를 actions 에서 실행 가능

- 비동기 로직은 actions 에서 정의한다.
- dispatch 를 통해 실행한다.
- 인자로 context를 받는다. context에는 vuex모든 내용이 포함되어 있어 모든 정보에 접근이 가능하다.
- 비구조화를 이용해 필요한 정보들만 사용할 수 있다.

```js
 actions: {
    fetchVideos({ state, commit }, event) { // 비구조화를 사용하면 깔끔하게 사용 가능함
    // fetchVideos(context, event) {
      
      //실행해야할 mutations 함수들을 모두 정의하여 한번에 실행
      commit('setSelectVideo', event.target.value)
      axios.get(...)
      ...
    }
  }
```



#### getters

> state 를 (가공해서)가져올 함수들. computed와 동일한 동작

- 모든 mutations 함수들은 state를 인자로 받아 state에 접근할 수 있다.
- `$store.getters.함수명`으로 실행할 수 있다.

```js
  getters: {
    videoUrl() {
      return `https://www.youtube.com/embed/${state.selectedVideo.id.videoId}`
    },  
  }

  // 컴포넌트
  computed: {
    videoUrl() {
      return `https://www.youtube.com/embed/${this.video.id.videoId}`
      },
  }
```



#### map Helper

> veux의 요소들을 사용할 때 `$store`를 사용하지 않고 간결하게 하기 위해 사용
> [**mapState 헬퍼**](https://vuex.vuejs.org/kr/guide/state.html#mapstate-헬퍼) => computed에서 사용
> [**mapGetters 헬퍼**](https://vuex.vuejs.org/kr/guide/getters.html#mapgetters-헬퍼) => computed에서 사용
> [**mapMutation 헬퍼**](https://vuex.vuejs.org/kr/guide/actions.html#컴포넌트-내부에서-디스패치-액션-사용하기) => methods에서 사용
> [**mapActions 헬퍼**](https://vuex.vuejs.org/kr/guide/actions.html#컴포넌트-내부에서-디스패치-액션-사용하기)  => methods에서 사용



```html
<template>
  <div class="search-bar">
      <input @keypress.enter="fetchVideos">
      <!-- 컴포넌트에서 action을 간결하게 사용할 수 있음
	  원래는 <input @keypress.enter="$store.actions.fetchVideos"> -->
  </div>
</template>

<script>
// 컴포넌트에서 action을 간결하게 사용할 수 있음
import { mapActions } from 'vuex' 

export default {
    name: 'SearchBar',
    methods: {
        ...mapActions([  // 배열의 형태로 불러와야 함
            'fetchVideos'
        ])
    },
}
</script>
```









## 7. Vue로 Front-End 구현하기

Django REST Framework를 백엔드로 사용하여 SPA개발하기





### (1) django-cors-headers

> https://github.com/adamchainz/django-cors-headers
>
> Cross-Origin Resource Sharing headers
> 백엔드 서버에 요청을 보내서 정보를 받아올 때 서버에 비동기 요청이 들어가나, 브라우저에서 보안상의 이유로 요청을 받아오는것을 막게 됨. 이를 해결하기 위한 라이브러리

```bash
$ python -m pip install django-cors-headers
```



#### setting.py

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
    # 공식문서에서 해당 위치에 적어달라고 함
    'django.middleware.common.CommonMiddleware',
    ...
]

# 필요에 따라 다른 설정들을 적용할 수 있음.
# 현재 설정은 모든 요청을 받는 설정
CORS_ORIGIN_ALLOW_ALL = True
```





### (2) vue-cookies

> https://www.npmjs.com/package/vue-cookies
>
> 뷰에서 쿠키 저장소를 사용하기 위한 라이브러리, `$cookies.method`로 사용
>
> - `set('key_name', value)`: 추가
> - `get('key_name')`: 불러오기
> - `remove('key_name')`: 쿠기 삭제
> - `isKey('key_name')`: 해당 키가 존재하는지 (Boolean)

```bash
$ npm install vue-cookies --save
```



#### main.js

```js
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
```





### (3) Login, Logout, Signup 구현



#### Login & Signup 컴포넌트

> 데이터를 백엔드에서 지정해놓은 JSON 형태로 만들어 놓고, `$emit`을 통해 한번에 올려준다. 

```html
<template>
  <div>
    <h1>Login</h1>
    username: <input type="text" v-model="loginData.username"><br>
    password: <input type="password" v-model="loginData.password"><br>
    <button @click="$emit('login', loginData)">Login</button>
  </div>
</template>

<script>
export default {
  name: 'LoginView', 
  data() {
    return {
      loginData: {
        username: null,
        password: null,
      }
    }
  }
}
</script>
<style></style>
```



#### Login & Signup 로직

> - `$emit`을 통해 전달받은 데이터를 함수 인자로 받아 `axios`로 요청을 보내 응답을 받는다.
> - Login에 성공하면 token을 응답받고, 이 토큰을 계속 사용해 사용자를 인증받는다.
> - 새로고침되어도 로그인이 풀리지 않도록 쿠키에 토큰값을 저장해 놓는다.
> - 이벤트 리스너는 항상 하위 컴포넌트의 이벤트만 반응하기 때문에 같은 컴포넌트의 이벤트를 듣지 못한다. 같은 컴포넌트에서 일어난 이벤트를 들어야 할 경우, 이벤트 리스너에 `.native`를 붙인다.
> - `axios.post(요청경로, body, header)`
> - 새로고침이 일어나도 로그인을 유지하기 위해서 `mounted()`시점을 이용한다.
> - 다른 경로의 router로 이동할 때는 `$router('경로')`

```html
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link> |
        <router-link to="/signup">signup</router-link>
      </span>
      <span v-if="isLoggedIn">
        <router-link to="/logout" @click.native="logout">Logout</router-link>
      </span>

    </div>
    <router-view @login="onLogin" @signup="onSignup"/>
  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = 'http://127.0.0.1:8000'

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
    }
  },
  methods: {
    onLogin(loginData) {
      // Django한테 로그인 요청 보내기
      axios.post(`${SERVER_URL}/rest-auth/login/`, loginData)
        .then(response => {
          // vue cookies 사용
          this.$cookies.set('auth-token', response.data.key)
          this.isLoggedIn = true
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    logout() {
      // 로그아웃 로직: token없애기, login변수 false, django에 로그아웃 알려주기
      const config = {
        headers: {
          Authorization: `Token ${this.$cookies.get('auth-token')}`
        }
      }
      axios.post(`${SERVER_URL}/rest-auth/logout/`, null, config) // 경로, body, header
      .then(() => {
        this.$cookies.remove('auth-token')
        this.isLoggedIn = false
        this.$router.push('/')
      })
      .catch(error => {
        console.log(error.response)
      })
    },
    onSignup(signupData) {
      axios.post(`${SERVER_URL}/rest-auth/signup/`, signupData)
        .then(response => {
          // 회원가입 후 로그인까지
          this.$cookies.set('auth-token', response.data.key)
          this.isLoggedIn = true
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error.response)
        })
    },
  },
  mounted() {
    // 새로고침이 일어나도 로그인을 유지
    this.isLoggedIn = this.$cookies.isKey('auth-token')
  },
}
</script>
<style></style>
```







### (4) Navigation Guard (Vue Router)

>  https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
>
> 사용자가 url을 조작하여 임의로 다른 기능을 사용할 수 없게 하기 위하여 사용하는 기능
>
> 라우트 별로 가드할때는 `beforeEnter(to, from, next) {}`를 사용
>
> - `to`: 대상 Route 객체로 이동
> - `from`: 현재 라우트로 오기전 라우트
> - `next`: 문제를 해결하기 위해 호출되는 함수로서 이동을 담당. **항상 next함수는 필요**
>   - `next()`: 다음 훅으로 이동
>   - `next('경로')`: 해당 경로 라우트로 이동
>   - `next(false)`: 네비게이션이 중단. 뒤로가기 하면 `from`경로로 이동



#### index.js

> - 로그인 한 상태에서 다시 로그인, 회원가입 url로 들어왔을 때, Home을 보내는 역할
> - JS파일이기 때문에 this가 먹지 않아 Vue를 사용해 줘야 함
> - to

```js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    beforeEnter(to, from, next) {
      // vue guard
      // 로그인 한 상태에서 다시 로그인 url로 들어왔을 때, Home을 보내는 역할
      // this가 먹지 않음
      if (Vue.$cookies.isKey('auth-token')) {
        next('/')
      } else {
        next() // next()는 반드시 필요
      }
    }
  },
  {
    path: '/signup',
    name: 'SignupView',
    component: SignupView,
    beforeEnter(to, from, next) {
      if (Vue.$cookies.isKey('auth-token')) {
        next('/')
      } else {
        next()
      }
    },
  },
]
```











