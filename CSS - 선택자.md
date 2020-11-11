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
            선택가능
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
            선택불가능
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
    선택가능
</ul>
```



#### 인접 형제 선택자 `+`

어떤 요소의 **인접한 첫번째 형제요소**만 선택하는 선택자

```css
section + ul {}
```

```html
<section>
</section>
<div>
</div>
<ul>
    선택불가능
</ul>
```







