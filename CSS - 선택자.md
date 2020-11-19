# CSS 선택자 정리





#### 기본: 전체, 태그, 클래스, 아이디 선택자

```css
* {}

p {}
div {}

.class{}

#id {}
```





## 복합 선택자



#### 하위선택자

부모요소에 포함된 **모든** 하위요소에 스타일을 적용

```css
section ul {}  // section의 모든 ul에 스타일을 적용
```

```html
<section>
	<div>
        <ul>
            스타일 적용
        </ul>
    </div>
</section>
```



#### 자식선택자 `>`

부모요소의 **바로 아래 자식 요소**에 스타일을 적용

```css
section>ul {}  // section의 바로아래 ul에 스타일 적용
```

```html
<section>
	<div>
        <ul>
            스타일 미적용
        </ul>
    </div>
</section>
```



#### 형제 선택자 `~`

어떤 요소의 **형제요소**를 선택하는 선택자

```css
section~ul {}  // section의 형제요소 중 모든 ul에 스타일 적용
```

```html
<section>
</section>
<ul>
    스타일 적용
</ul>
```



#### 인접 형제 선택자 `+`

어떤 요소의 **인접한 첫번째 형제요소**만 선택하는 선택자

```css
section + ul {}  // section의 형제요소 중 첫번째 ul에 스타일 적용
```

```html
<section>
</section>
<div>
</div>
<ul>
    스타일 미적용
</ul>
```





## 속성 선택자



#### `[attribute]`

해당 **속성**을 가지고 있는 요소를 선택하는 선택자

```css
section[title] {}  // section 태그 중 title 속성을 가지고 있는 요소에 스타일 적용
```

```html
<section>스타일 미적용</section>
<section title='whatever'>스타일 적용</section>
```



#### `[attribute="value"]`

해당 **속성값이 value**인 요소를 선택하는 선택자

```css
section[title='abc'] {}  // section 태그 중 title 속성이 abc인 요소에 스타일 적용
```

```html
<section title='abc'>스타일 적용</section>
<section title='abc def'>스타일 미적용</section>
```



#### `[attribute~="value"]`

해당 **속성값이 value를 포함하고 있는** 요소를 선택하는 선택자

```css
section[title~='abc'] {}  // section 태그 중 title 속성이 abc를 포함하는 요소에 스타일 적용
```

```html
<section title~='abc'>스타일 적용</section>
<section title~='abc def'>스타일 적용</section>
<section title~='abcdef'>스타일 미적용</section>
```



#### `[attribute^="value"]`

해당 **속성값이 value로 시작하는** 요소를 선택하는 선택자, **문자열 기준으로 탐색함**

```css
section[title^='abc'] {}  // section 태그 중 title 속성이 abc로 시작하는 요소에 스타일 적용
```

```html
<section title^='abc'>스타일 적용</section>
<section title^='abc def'>스타일 적용</section>
<section title^='abcdef'>스타일 적용</section>
<section title^='abc-def'>스타일 적용</section>
```



#### `[attribute$="value"]`

해당 **속성값이 value로 끝나는** 요소를 선택하는 선택자, **문자열 기준으로 탐색함**

```css
section[title$='abc'] {}  // section 태그 중 title 속성이 abc로 끝나는 요소에 스타일 적용
```

```html
<section title$='abc'>스타일 적용</section>
<section title$='def abc'>스타일 적용</section>
<section title$='defabc'>스타일 적용</section>
<section title$='def-abc'>스타일 적용</section>
```



#### `[attribute*="value"]`

해당 **속성값이 value가 포함된** 요소를 선택하는 선택자, **문자열 기준으로 탐색함**

```css
section[title$='abc'] {}  // section 태그 중 title 속성에 abc가 포함된 요소에 스타일 적용
```

```html
<section title~='abc'>스타일 적용</section>
<section title~='def abc ghi'>스타일 적용</section>
<section title~='defabcghi'>스타일 적용</section>
<section title~='def-abc-ghi'>스타일 적용</section>
<section title~='def-abc ghi'>스타일 적용</section>
```





## 가상 클래스 선택자 (Pseudo-Class Selector)

원래 클래스가 존재하지 않지만 가상 클래스를 임의로 지정하여 선택하는 방법



### 동적 가상 선택자

- `:link` - 셀렉터가 **방문하지 않은 링크**일 때
- `:visited` - 셀렉터가 **방문한 링크**일 때
- `:hover` - 셀렉터에 **마우스가 올라온 상태**일 때
- `:active` - 셀렉터가 **클릭된 상태**일 때
- `:focus` - 셀렉터에 **포커스가 들어와 있는 상태**일 때
- `:checked` - **라디오버튼**이나 **체크박스**같은 사용자 인터페이스에서 사용





### 구조 가상 선택자

##### child 종류

- `:first-child` - 부모요소의 **모든 자식요소 중 첫번째 자식**인 요소를 선택
- `:last-child` - 부모요소의 **모든 자식요소 중 마지막 자식**인 요소를 선택
- `:nth-child(n)` - 부모요소의 **모든 자식요소 중 앞에서 n번째 자식**인 요소를 선택
- `:nth-child(an+b)` - 부모요소의 **모든 자식요소 중 앞에서 an+b번째 자식**인 요소를 선택, **n에는 음이아닌 정수가 차례대로 대입됨(0, 1, 2, 3, ...)**
- `:nth-last-child(n)` - 부모요소의 **모든 자식요소 중 뒤에서 n번째 자식**인 요소를 선택
- `:nth-last-child(an+b)` - 부모요소의 **모든 자식요소 중 중 뒤에서 an+b번째 자식**인 요소를 선택, **n에는 음이아닌 정수가 차례대로 대입됨(0, 1, 2, 3, ...)**
- `:nth-child(odd)` - 부모요소의 **모든 자식요소 중 홀수번째 자식**인 요소 선택
- `:nth-child(even)` - 부모요소의 **모든 자식요소 중 짝수번째 자식**인 요소 선택
- `:only-child` - **자식요소를 단 하나**만 가지고 있을때 선택, 자식요소가 2개 이상이라면 선택되지 않음

##### type 종류

- `:first-of-type` - 부모요소의 **모든 자식요소 중 같은유형의 첫번째 자식**인 요소 선택
- `:last-of-type` - 부모요소의 **모든 자식요소 중 같은유형의 마지막 자식**인 요소 선택
- `:nth-of-type(n)` - 부모요소의 **모든 자식요소 중 같은유형의 n번째 자식**인 요소 선택
- `:nth-of-type(an+b)` - 부모요소의 **모든 자식요소 중 같은유형의 an+b번째 자식**인 요소를 선택, **n에는 음이아닌 정수가 차례대로 대입됨(0, 1, 2, 3, ...)**
- `:nth-last-of-type(n)` - 부모요소의 **모든 자식요소 중 같은유형의 뒤에서 n번째 자식**인 요소 선택
- `:nth-of-type(an+b)` - 부모요소의 **모든 자식요소 중 같은유형의 an+b번째 자식**인 요소를 선택, **n에는 음이아닌 정수가 차례대로 대입됨(0, 1, 2, 3, ...)**
- `:nth-of-type(odd)` - 부모요소의 **모든 자식요소 중 같은유형의 홀수번째 자식**인 요소 선택
- `:nth-of-type(even)` - 부모요소의 **모든 자식요소 중 같은유형의 짝수번째 자식**인 요소 선택
- `:only-of-type` - **형제 태그 중 같은 유형의 태그가 하나**밖에 존재하지 않는 경우 선택





### 부정 선택자

- `:not(셀렉터)` - 셀렉터에 **해당하지 않는 모든 요소**를 선택





### 가상 요소 선택자

- `::first-letter` - 콘텐츠의 **첫글자**를 선택
- `::first-line` - 콘텐츠의 **첫줄**을 선택, **블록 요소에만 적용가능**
- `::before` - 콘텐츠의 **앞에 위치하는 공간**을 선택, **일반적으로 content 어트리뷰트와 함께 사용**
- `::after` - 콘텐츠의 **뒤에 위치하는 공간**을 선택, **일반적으로 content 어트리뷰트와 함께 사용**
- `::selection` - **드래그한 콘텐츠를 선택**



