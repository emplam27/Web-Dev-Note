# 33 Concepts Every JavaScript Developer Should Know 







## 1. Call Stack

자바스크립트는 함수를 스택을 이용해 실행한다.

에러 메세지는 에러가 발생한 함수의 Call Stack을 출력해준다.





## 2.  Primitive Types

null: 존재하지 않음으로 정의가 됨

undefined: 정의가 되지 않음

NaN: Not a Number, 수적 연산이 망가지게 되면 반환하는 값. ex) 6 * '문자열' = NaN





## 3. Value Types and Reference Types

단일의 값(value)을 가지는 변수들의 경우에는 변수를 복사할 때 값을 복사하지만, array, object 등의 자료형은 참조(reference)를 진행한다. 메모리에 저장되어 있는 임의의 배열 및 객체를 변수명을 이용해 참조하고 있을 뿐이다.

- Value: string, number, boolean, NaN, undefined, null
- Reference: array, object, function

```js
[10] === [10] // false
{'a': 20} === {'a': 20}
```





## 4. Type Conversion

`==` 를 사용하면 자동으로 형변환을 함. `===` 사용할 것

```js
4 + "hello" 	// 4hello
4 + 4 + "hello" // 8hello
"" == false		// true
1 == true		// true
66 + true 		// 67
```





## 5. Type of



- `typeof()`: 모든 primitive에서 작동한다. **하지만 null의 경우 object를 반환한다.**

- `instanceof()`: array, object에서 작동한다. 

```js
[] instanceof Array // true
```





## 6. Scope

변수를 정의할 때 var를 사용하게 되면 함수안에 정의한 변수여도 접근이 사용 가능하다. 때문에 const, let이 나왔으며, var를 사용하면 안된다.





## 7. Expression vs. Statement

Expression: 변수로 반환되는것

Statement: 명령 또는 지시. 반환되는 값이 없는 것

Function declaration: 일반적으로 함수로써 정의하는 것. 호이스팅 할 수 있음

Function expression:  변수로써 함수를 정의하는 것. 호이스팅 할 수 없음



















