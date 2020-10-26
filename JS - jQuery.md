# jQuery 기본



## jQuery란?

HTML 요소들을 조작하는 편리한 JavaScript 라이브러리

- JavaScript와 다른 특별한 소프트웨어가 아니라 미리 작성된 코드를 모아둔 것

- 직접 JS 코드를 작성하여 모든 기능을 구현할 수도 있지만, 이 경우에 코드가 복잡하고, 개발환경과 다른 브라우저에서 잘 작동을 안하는 등 브라우저 간 호환성을 직접 고려해야하는 등의 문제가 있기 때문에 전문 개발자가 작성한 라이브러리를 가져와서 사용하면 편합니다.

- **대신, 쓰기 전에 임포트를 해주어야합니다.**

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





