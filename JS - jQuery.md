# jQuery 기본



## jQuery란?

HTML 요소들을 조작하는 편리한 JavaScript 라이브러리

- JavaScript와 다른 특별한 소프트웨어가 아니라 미리 작성된 코드를 모아둔 것

- 직접 JS 코드를 작성하여 모든 기능을 구현할 수도 있지만, 이 경우에 코드가 복잡하고, 개발환경과 다른 브라우저에서 잘 작동을 안하는 등 브라우저 간 호환성을 직접 고려해야하는 등의 문제가 있기 때문에 전문 개발자가 작성한 라이브러리를 가져와서 사용하면 편함.

- **대신, 쓰기 전에 import 필수**

- JQuery와 순수 JavaScript의 코드를 비교해보면,

  JS에서 `elememt`란 id를 가진 요소를 감추려면

  ```jsx
  document.getElementById("element").style.display = "none";
  ```

  이렇게 길고 복잡하게 써야하지만, JQ로는

  ```jsx
  $('#element').hide();
  ```

  이렇게 간단하고 직관적으로 쓸 수 있음





## jQuery 사용하기

- jQuery를 사용하기 위해서는 미리 작성된 JavaScript 코드를 CDN으로 임포트

  ```html
  <script src="<https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js>"></script>
  ```

- jQuery를 사용하는 방법

  CSS와 마찬가지로 jQuery를 쓸 때 특정 요소를 '가리켜야' 조작할 수 있습니다. CSS에서는 선택자로 class를 주로 사용했는데, jQuery에서는 고유한 하나의 요소를 가리키는 id를 주로 사용합니다.







## 자주 쓰이는 jQuery



#### (1) input 박스의 값 가져오기

- html

   ```html
   <div class="form-group">
       <label for="exampleInputEmail1">아티클 URL</label>
       <input id="post-url" type="email" class="form-control" aria-describedby="emailHelp"
           placeholder="">
   </div>
   ```

- js

  ```js
  // input의 값 가져오기
  let url = $('#post-url').val()
  
  // input에 값 넣기
  $('#post-url').val("새 글입니다.")
  ```

  