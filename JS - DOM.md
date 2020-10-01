# JS DOM





### JS에서 document & window란

- JS에서 document는 HTML문서를 가르킨다. 각 HTML 태그를 접근하여 속성을 바꿀 때 사용한다.
- JS에서 window는 페이지가 로드되는  브라우저의 창을 의미한다. event listener를 이용할 때 사용한다.



### DOM(Document Object Model)

HTML의 요소를 가져와 객체로 바꿔줌



### 대표적인 DOM function 목록



#### 1. querySelector('노드'), querySelectorAll('노드')

> 대상 노드를 선택하는 메서드, 주로 body 부분에 특정한 id, class값을 갖는 태그들을 선택할 때 사용
>
> - `querySelector()` : 제공한 CSS선택자를 만족하는 첫 번째 `Element`객체를 반환, 없다면 `null` 반환
> - `querySelectorAll()` : 지정한 셀렉터와 하나라도 일치하는 `NodeList`, 없다면 비어있는 `NodeList`
>
> 



#### 2. createElement('태그')

> 새로운 노드를 생성, 주로 새로운 태그를 생성할 때 사용



#### 3. setAttribute('속성', '속성값')

> 대상 노드의 속성값을 변경할 때 사용



#### 4. innerText, innerHTML

> 대상 노드 안에 텍스트, html을 작성할 때 사용



#### 5. addEventListener('이벤트', '함수')

> 이벤트가 발생하였을 때, 특정 함수를 실행하게할 때 사용, 함수를 실행할 시 `event`인자를 받게되며,   `event.target`이 event가 실행된 객체이다.
>
> - `click` : 클릭되었을 때
> - `mouseover` : 커서가 올라갔을 때
> - `mouseout` : 커서가 올라가있다가 벗어났을 때
> - `keypress` : 키보드가 눌렸을 때
> - `keydown` : 키보드가 눌리고 있을 때
> - `keyup` : 눌렸던 키보드가 떨어졌을 때
> - `load` : 로딩이 완료되었을 때
> - `scroll`  : 스크롤 됐을 때
> - `change` : `<input>`, `<select>`, `<textarea>` 등에서 변화가 있을 때





#### 6. append('객체'...), appendChild('객체')

> 자식노드로 설정할 때 사용





### ex) 시계만들기

```html
<body>
  <div id="jsClock">
    <h1>00:00</h1>
  </div>

  <script>
    const clockContainer = document.querySelector("#jsClock")
    const clockTitle = clockContainer.querySelector("h1")

    function getTime() {
      const date = new Date()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}
      `
    }

    function init() {
      getTime()
      setInterval(getTime, 1000)
    }

    init();

  </script>
</body>
```



### ex) greeting form 만들기

```html
<body>
  <form id="jsForm">
    <input type="text" placeholder="What is your name?" />
    <h4></h4>
  </form>

  <script>
    const form = document.querySelector("#jsForm")
    const input = form.querySelector("input")
    const greeting = form.querySelector("h4")

    form.addEventListener("submit", function (event) {
      console.log('press enter')
      event.preventDefault()
      localStorage.setItem("currentUser", input.value)
      loadName()    
    })

    function loadName() {
      console.log('loadName')
      const currentUser = localStorage.getItem("currentUser")
      if (currentUser === null) {
        greeting.style.display = "none"
        input.style.display = "block"
      } else {
        input.style.display = "none"
        greeting.style.display = "block"
        greeting.innerText = `Hello ${currentUser}`
      }
    }

    function init() {
      loadName()
    }

    init()

  </script>
</body>
```





### ex) Todo List 만들기

```html
<body>
  <h2>Add New Todo</h2>
  <p id="todoForm"></p>
  <hr>

  <h2>Todo List</h2>
  <ul id="todoList">
    <!-- <li>
      <input type="checkbox">
      <span>내용</span>
      <input type="text">
      <button>Edit</button>
      <button>Delete</button>
    </li> -->
  </ul>
  <hr>

  <h2>Completed Tasks</h2>
  <ul id="completedList"></ul>
  <hr>

  <script>

    // Add New Todo 파트
    const todoForm = document.querySelector('#todoForm')  // 아이디 선택
    
    const formLabel = document.createElement('label')     // <label>
    formLabel.innerText = 'Add New Todo: '                // <label>Add New Todo</label>
    
    const formInput = document.createElement('input')     // <input>
    formInput.setAttribute('type', 'text')                // <input type="text">
    // formInput.type = 'text' 도 가능

    const formSubmitBtn = document.createElement('button') // <button></button>
    formSubmitBtn.innerText = 'Add'                        // <button>Add</button>

    formSubmitBtn.addEventListener('click', function () {
      addTodoObject(formInput.value)
    })// 주로 이름이 필요없는 함수는 이벤트 안에서 작성

    // todoForm.appendChild(formLabel)
    // todoForm.appendChild(formInput)
    // todoForm.appendChild(formSubmitBtn)
    todoForm.append(formLabel, formInput, formSubmitBtn)



    // Todo List 파트, 함수는 호이스팅 되서 위에서 사용이 가능하다.
    function addTodoObject(text) {

      const todoList = document.querySelector('#todoList')
      const completedList = document.querySelector('#completedList')
  
      const todoObject = document.createElement('li')
  
      const todoObjectCheckbox = document.createElement('input')
      todoObjectCheckbox.setAttribute('type', 'checkbox')
      todoObjectCheckbox.addEventListener('change', function (event) {
        // console.log(event.srcElement.checked)
        // console.log(this.checked)
        if (event.target.checked) {
          completedList.appendChild(todoObject)
          todoObjectContent.style.textDecoration = 'line-through'
        } else {
          todoList.appendChild(todoObject)
          todoObjectContent.style.textDecoration = null
        }
      })
  
      const todoObjectContent = document.createElement('span')
      todoObjectContent.innerText = text //함수의 변수
  
      const todoObjectEditInput = document.createElement('input')
      todoObjectEditInput.setAttribute('type', 'text')
  
      const todoObjectEditBtn = document.createElement('button')
      todoObjectEditBtn.innerText = 'Edit'
      todoObjectEditBtn.addEventListener('click', function () {
        if (todoObjectEditInput.value !== '') {
          todoObjectContent.innerText = todoObjectEditInput.value  
          todoObjectEditInput.value = null // Edit을 눌러 todoObjectContent 갱신
        } else {
          alert('텍스트를 작성해주세요.')
        }
      })
  
      const todoObjectDeleteBtn = document.createElement('button')
      todoObjectDeleteBtn.innerText = 'Delete'
      todoObjectDeleteBtn.addEventListener('click', function () {
        todoObject.remove() // Delete를 눌러 <li>(todoList) 삭제
      })
  
      todoList.appendChild(todoObject)
      todoObject.append(todoObjectCheckbox, todoObjectContent, todoObjectEditInput, todoObjectEditBtn, todoObjectDeleteBtn)
    
      formInput.value = null
    }

  </script>
</body>
```

