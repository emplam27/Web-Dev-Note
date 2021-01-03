# JavaScript 기초문법



[TOC]







## 타입과 연산자



### 1. Primitive 타입

#### (1) Number

JS에서 숫자 값을 표현하는 방법

자바스크립트에서는 변수를 선언할 때 키워드를 작성하고 변수를 선언해야 한다.

**키워드를 작성하지 않으면 전역변수가 된다. (global var)**

```js
const a = 13
const b = -5
const c = 3.14
const d = 2.998e8
const e = Infinity
const f = -Infinity
const g = NaN 		// Not a Number
typeof Nan 			// Number
```

`Number.isNaN`을 통해 값이 `NaN` 인지 여부를 확인할 수 있다.



#### (2) String

JS에서 문자열을 표한하는 방법

```js
typeof 'Ask and go to the blue'		//string
typeof "Ask and go to the blue"		//string
typeof `Ask and go to the blue`		//string
```

```js
const hello = 'hello
world' // 따옴표 사용시에는 백슬레시 작성이 필요

const hello = `hello
world` // ``사용시에는 백슬래시 필요 없음

const hello = '안녕 \n하세요'
```



#### (2-1)  Template literal

ES6+ 이후부터 지원하는 문법, 단 escape sequence를 사용할 수 없다.

```js
const message = '안녕하세요'
`남겨진 메세지입니다: ${message}`
```



#### (3) Boolean

참과 거짓을 표현

```js
true
false
```



#### (4) Empty Value

() 값이 없음을 표현하는 값, `null` 과 `undefined` 가 있다. **둘의 타입이 다름에 주의** 

```js
null 				// 의도적으로 값이 없음을 표현
undefined 			// 값이 없을경우 JS가 표현

let abc = null
console.log(abc) 	// null

let abc
console.log(abc) 	// undefined

typeof null 		// object 
typeof undefined 	// undefined
```





### 2. 연산자

#### (1) 할당연산자

연산과 동시에 변수에 할당하는 연산자

```js
const abc = 0
abc = 123 	// 재할당 시 오류반환, 상수할당

TypeError: invalid assignment to const

let c = 0 	// 변수할당, 재할당 가능
c += 10
c ++ 		// c에 1을 더한다.
c -- 		// c에 1을 뺀다.
```



#### (2) 비교연산자

두 값을 비교하기 위한 연산자로 `true` 혹은 `false` 값을 반환

소문자 > 대문자, 알파벳을 오름차순 (ASCII 순서)

```js
3 > 2	// true
3 < 2	// false

// ASCII 코드 기준
'A' < 'B' 	// true
':' < ';'	// true 
'가' < '나'
```



#### (3) 동등연산자 (`==`)

서로 같은 값을 갖도록 형변환 할 수 있다면, 같다고 판단한다.

```js
1 == '1'	// ture
```



#### (4) 일치 연산자(`===`)

엄격한 비교, 자동 형변환 비교 X

```js
1 === '1'
```



#### (5) 논리 연산자

세가지 연산: and, or, not

```js
true && false	//false  앞이 true이면 뒤를 반환
true && true	// true

1 && 0			// 0
0 && 1 			// 1  앞이 false이면 앞을 반환
4 && 7 			// 7
```

```js
false || true	// true  앞이 false이면 뒤를 반환
false || true	// false

1 || 0			// 1
0 || 1 			// 1
4 || 7 			// 4  앞이 true이면 앞을 반환
```

```js
!true 	// false
!false	// true
```



#### (6) 삼항연산자

`조건식 ? true값 : false값`

```js
const random = 4

const result = random % 2 === 0 ? '짝수' : '홀수'
```







## 조건문과 반복문



### 1. 조건문

`if`, `else if`, `else`

```js
const number = 0

if (number > 0) {
    console.log('hello')
} else if (number < 0) {
    console.log('world')
} else {
    console.log('hi')
}
```





### 2. switch 문

`case`에 걸리는 순간부터 아래있는 모든 `case`를 전부 실행한다.

따라서 `break`를 통해 중지해줘야함. 모든 `case`에 걸리지 않으면 `default` 실행

``` js
const name = 'admin'

switch (name) {
    case 'admin': {
        console.log('관리자님 환영합니다.')
    }
    case 'manager': {
        console.log('매니저님 환영합니다.')
    }
    default: {
        console.log(`${name}님 환영합니다.`)
    }
}
// 관리자님 환영합니다.
// 매니저님 환영합니다.
// admin님 환영합니다.


switch (name) {
    case 'admin': {
        console.log('관리자님 환영합니다.')
        break
    }
    case 'manager': {
        console.log('매니저님 환영합니다.')
        break
    }
    default: {
        console.log(`${name}님 환영합니다.`)
    }
}
// 관리자님 환영합니다.
```





### 3. 반복문

#### (1) while

괄호에 나오는 조건이 true인 동안 반복하는 반복문

```js
let i = 0

while (i < 6) {
    console.log(i)
    i ++
}
```



#### (2) for

JS에서 가장 일반적인 반복문. 변수를 하나 정의하고, 변수가 특정 조건에 대해서 false값이 될 때 까지 연산하며 반복.  

**`()`안의 변수는 블록단위의 scope를 가지고 있게 되며, 변수정의를 하지 않으면 for문이 끝나고도 값을 가지고 있게 된다.**

```js
for (let i = 0; i < 6; i++) {
    console.log(i) // 0 ~ 5
}
```



#### (3) for of

배열에서 요소를 하나씩 순회하여 반복하는 반복문

**`()`안의 변수는 블록단위의 scope를 가지고 있게 되며, 변수정의를 하지 않으면 for문이 끝나고도 값을 가지고 있게 된다.**

```js
const numbers = [1, 2, 3, 4, 5]

for (const number of numbers) {
    console.log(number) // 1 ~ 5
}
```



#### (4) for in

Object의 key를 순회하는 반복문이다. Array의 경우에는 index를 순회한다.

```js
const fruit = {a: 'apple', b: 'banana'}

for (const key in fruits) {
    console.log(key, fruits[key])
}
// a apple
// b banana

const fruit = ['apple', 'banana']

for (const idx in fruits) {
    console.log(idx, fruits[idx])
}
// 0 apple
// 1 banana
```







## 함수



### 1. 함수작성

#### (1) 함수선언식 (statement, declaration)

```js
function add(num1, num2) {
    return num1 + num2
}

add(2, 7)	// 9
```



#### (2) 함수표현식

익명함수(anonymous function)를 변수에 담는다.

```js
const sub = function(num1, num2) {
    return num1 - num2
}

sub(7, 2)	// 5
```



#### (3) 기본인자 (default arguments)

```js
const greeting = function(name='익명') {
    console.log(`hello ${name}`)
}
```



#### (4) 함수의 유연한 인자 수(JS 특징)

```js
function wrongArgCount(a, b) {
      console.log(a, b)
    }

    wrongArgCount()
    wrongArgCount(1)
    wrongArgCount(1, 2, 3)

    function noArgs() {
      console.log('no args..')
    }
    noArgs(1, 2, 3, 4, 5, 6)
```



#### (5) rest parameter(`...`)

> `...args` 사용가능, 배열을 함수의 인자처럼 활용 가능하며, 배열 합치기, 배열 복사 등에서도 이용이 가능하다.

```js
function restParameter1(...numbers) {
      console.log(numbers)
    }

    restParmeter1(1, 2, 3, 4, 5)

    function restParameter2(a, b, ...numbers) {
      console.log(a, b, numbers)
    }

    restParmeter2(1, 2, 3, 4, 5)

    // 4. JS spread operator
    function spreadOperator(a, b, c) {
      console.log(a, b, c)
    }

    let numbers = [1, 2, 3]

    spreadOperator(numbers[0], numbers[1], numbers[2])
    spreadOperator(...numbers)
    numbers = [1, 2, 3, 4]
    spreadOperator(...numbers)

    // 배열 합치기
    let newNumbers = [0, ...numbers, 5]
    console.log(newNumbers)

    // copy.copy
    newNumbers = numbers  // Copy X
    newNumbers = [...numbers]  // Shallow Copy

```







### 2. Arrow function

> 1. function 생략해도 된다.
> 2. 함수의 매개변수가 1개라면 `()`를 생략해도 된다.
> 3. 함수 바디의 표현식이 1개라면 `return`을 생략해도 된다.



#### 사용법

```js
const arrow = function(name) {
    return `hello ${name}`
}

// 1. function 키워드 삭제, 화살표 추가
const arrow = (name) => {return `hello ${name}`}

// 2. 괄호 생략
const arrow = name => {return `hello ${name}`}

// 3. 중괄호 제거, return 제거
const arrow = (name) => `hello ${name}`
```







## 자료구조(Array & Object)



### 1. Array

```js
const numbers = [1, 2, 3, 4]

numbers[0]				// 1
numbers[-1]				// undefined 
numbers.length			// 4
```



#### 자주사용하는 함수들

`reverse` : 원본 배열의 순서를 반대로 정렬한다.

```js
numbers.reverse() 		// [4, 3, 2, 1]
```



`push & pop` : 배열의 가장 마지막에 요소를 추가하거나 제거한다.

```js
numbers.push('a')		// [4, 3, 2, 1, 'a']
numbers.pop()			// [4, 3, 2, 1]
```



`unshift & shift` : 요소를 배열의 가장 앞자리에 추가하거나 제거한다. 

```js
numbers.unshift('a')	// 5 (길이를 반환한다. ['a', 4, 3, 2, 1])
numbers.shift()			// [4, 3, 2, 1]
```



`include` : 배열에 특정 요소가 있는지 boolean 값으로 반환

```js
numbers.include(1)		// true
numbers.include(0)		// false
```



`indexOf` : 배열의 특정 요소가 있다면 index를 반환, 없다면 `-1` 을 반환

```js
numbers.indexOf(4)			// 0
numbers.indexOf('홍길동')	  // -1	
```



`join` : 배열의 요소를 함수의 인자를 기준으로 이어서 문자열로 반환, 인자가 없다면 `,` 를 기준으로 이어서 문자열로 반환

```js
numbers.join()			// "4,3,2,1"
numbers.join('-')		// "4-3-2-1"
numbers.join(', ')		// "4, 3, 2, 1"
```





#### :bulb: 속도가 매우빠른 스프레드(`...`)를 이용한 배열 합치기

```js
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const arr = [...arr1, ...arr2] // [1, 2, 3, 4, 5, 6]
```







### 2. arrayHelperMethods



#### (1) map

> 배열을 순회하면서 각 요소에 함수를 적용시킨 후 각 요소의 자리에 넣고 배열을 반환한다. 

```JS
['1', '2', '3'].map(Number)  // [1, 2, 3]

const numbers = [0, 9, 99]

function addOne(number) {
    return number + 1
}

const newNumbers1 = numbers.map(addOne)
const newNumbers2 = [0, 9, 99].map(function(number) { 
    // [0, 9, 99] 를 순회하며, 각 요소를 (number) 자리에 넣는다.
    // 그리고 리턴된 값을 새로운 배열에 넣고 마지막에 리턴한다.
    return number + 1
})
console.log(newNumbers1, newNumbers2)
```



#### (2) forEach

> map과 같지만 반환값이 없다.

```js
const newNumbers = [1, 2, 3]
    
    let sum = 0
    newNumbers.forEach(function(number) {
      // numbers 의 각 요소를 number 자리에 넣고,
      // 나머지는 알아서 하세요. 리턴 없습니다.
      sum += number
    })
```



#### (3) filter

> 반환값이 `true`인 요소들만으로 새로운 배열을 만들어 반환한다.

```js
 const odds = [1, 2, 3].filter(function(number) {
      // 각 요소를 number 자리에 넣고,
      // 리턴이 true 인 요소들만 모아서 새로운 배열로 리턴.
      return number % 2 === 1
    })

    console.log(odds)
```







### 3. Object

key는 문자열 타입이며, value는 모든 타입이 될 수 있다.

```js
const me = {
	name: '홍길동',  // key가 한 단어일 때
	'phone number': '01012345678',  // key가 여러 단어일 때
  	appleProducts: {
		ipad: '2018pro',
		iphone: '7+',
		macbook: '2019pro',
	},
}
```

```js
me.name						// 홍길동
me['name']					// 홍길동
me['phone number']			// 01012345678
me.appleProducts			// { ipad:... }
me.appleProducts.macbook	// 2019pro
```





### 4. Object to array

`Object.keys`

``` js
const fruits = {a: 'apple', b: 'banana'}
Object.keys(fruits)		// ["a", "b"]
```



`Object.values`

```js
const fruits = {a: 'apple', b: 'banana'}
Object.values(fruits)	// ["apple", "banana"]
```



`Object.entries`

```js
const fruits = {a: 'apple', b: 'banana'}
Object.entries(fruits)	// [["a", "apple"], ["b", "banana"]]
```





#### (ES6+) Object Literal

객체의 key와 value 값이 같다면 마치 배열을 정의하는 것 처럼 object를 작성할 수 있다.

```js
const name = '홍길동'
const age = 100

const person = {
    name, 	
    age,	
} 	// {name: '홍길동', age: 100}
```









## JSON(JavaScript Object Notation - JS객체 표기법)



#### Object => JSON

```js
const lunch = {china: '짜장면', korea: '볶음밥'}
const jsonData = JSON.stringify(lunch)
console.log(typeof jsonData)	// string
```



#### JSON => Object

```js
const parsedData = JSON.parse(jsonData)
console.log(typeof parsedData)	// Object
```





## 기타

### Scope

```js
function add(a, b) {
    if (ture) {
        var a = 123
        const b = 456
    }
    console.log(a) // 123, var은 함수 블록 안에서는 살아있음
    console.log(b) // undefined, const와 let은 블록이 끝나면 소멸
}
```





### :bulb:this

> - 메소드: 객체안에 정의된 함수 (객체.methodName() 으로 실행하는 함수)
> - 함수: 메소드 가 아닌 모든 함수
>
> 
>
> - `this`는 object를 편하게 사용하기 위함. 기본적으로 window 다.
>   단! 아래의 2가지 경우만 제외하고.
>   1. method 정의 블록 안의 this -> 해당 method 가 정의된 객체(object)
>      (method 정의할때는 arrow function 을 쓰지 않는다.)
>   2. 생성자 함수 안의 this 
>
> - 콜백함수의 경우에는 다르다.
>   - Callback 함수로서 function 키워드로 선언한 함수의 this는 window를 가르킨다. 
>     (addEventListener 제외)
>   - arrow function의 this는 해당 함수를 호출하는 함수의 this를 가르킨다.

```js
const obj = {
    name: 'obj',
    method1: function () {
        console.log(this)  // obj
    },
    objInObj: {
        name: 'object in object',
        // oioMethod: function () {} -> 아래와 완전히 같음
        oioMethod () {  // ES6 synthatic sugar(코드를 짧고 쉽게)
            console.log(this) // objInObj
        }
    },

    arr: [0, 1, 2],
    newArr: [],
    method2 () {
        this.arr.forEach(
            /* 아래 function 은 메소드인가? No. 그러므로 this 는 window

            function(number) {
              // console.log(this)
              this.newArr.push(number * 100)
            }.bind(this) 

          */

            (number) => {
                this.newArr.push(number * 100)
            }
        ) // obj
    }
}

obj.method1() // obj
obj.objInObj.oioMethod() // objInObj
obj.method2()  // 

```





### :star::star::star:비구조화:star::star::star:

object로 들어오는 data 중 일부의 속성만 사용하고 싶을 때 활용

```js
context = {
    state: ...,
    commit: ...,
    getters: ...,
    ...
}

// context가 모두 인자로 들어와도 일부분만 가져다 사용할 수 있음
function my_func({ state, commit}) { 
    state...
    commit...
}
```











