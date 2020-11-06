# BeautifulSoup 웹 스크래핑



## 웹 스크래핑?

웹 스크래핑(web scraping)은 **웹 페이지에서 우리가 원하는 부분의 데이터를 수집해오는 것을 뜻함**

- 한국에서는 같은 작업을 *크롤링 crawling* 이라는 용어로 혼용해서 쓰는 경우가 많음. 원래는 크롤링은 자동화하여 주기적으로 웹 상에서 페이지들을 돌아다니며 분류/색인하고 업데이트된 부분을 찾는 등의 일을 하는 것을 뜻함.
- 구글 검색을 할 때는 **web scraping** 으로 검색해야 페이지 추출에 대한 결과가 나옴
- 참고 [Web Scraping](https://en.wikipedia.org/wiki/Web_scraping)(wikipedia) / [Web Crawler](https://en.wikipedia.org/wiki/Web_crawler)(wikipedia) [Web Scraping vs Web Crawling: What’s the Difference?](https://dzone.com/articles/web-scraping-vs-web-crawling-whats-the-difference)





## 방법

- 네이버 영화 순위 페이지에서 영화 제목들을 스크래핑

  링크: https://movie.naver.com/movie/sdb/rank/rmovie.nhn?sel=pnt&date=20200303

1. 크롬 브라우저에 페이지를 띄우고 개발자도구를 열어 HTML 구조를 파악

   - 각 영화들이 old_content라는 id를 갖는 div 안에 table 안에 tbody 안에 tr 태그로 존재
   - 일부 tr은 가로줄을 표시하기 위한 태그라서 영화 정보가 없음
   - 각 영화 정보에서 제목은 title이라는 클래스를 갖는 td 안에 div 안에 있는 a 태그의 텍스트로 들어가 있음

   개발자도구 Elements 탭에서 각 구역을 접어가며 점점 상위 요소를 파악해 id를 갖는 요소까지 올라가면 됨



## 실습

```bash
$ pip install beautifulsoup4
```



### 네이버 영화 순위 페이지에서 영화 제목을 스크래핑하기

> 개발자도구 Elements 탭에서 요소를 우클릭한 후 Copy > Copy selector를 해서 CSS선택자를 얻을 수 있음

```python
import requests
from bs4 import BeautifulSoup

# 1. 타겟 URL을 읽어서 HTML를 받아오기
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}
data = requests.get('https://movie.naver.com/movie/sdb/rank/rmovie.nhn?sel=pnt&date=20200303',headers=headers)


# 2. HTML을 BeautifulSoup이라는 라이브러리를 활용해 검색하기 용이한 상태로 만듦
# soup이라는 변수에 "파싱 용이해진 html"이 담긴 상태가 됨
# 이제 코딩을 통해 필요한 부분을 추출하면 됨
soup = BeautifulSoup(data.text, 'html.parser')
print(soup)  # HTML을 받아온 것을 확인 가능


# 3. 위에서 파악한 구조를 이용하여 우선 select()를 이용해 영화들을 찾기
# select를 이용해서, tr들을 불러오기
movies = soup.select('#old_content > table > tbody > tr')

# movies (tr들) 의 반복문을 돌리기
for movie in movies:
    # movie 안에 a 가 있으면,
    # (조건을 만족하는 첫 번째 요소, 없으면 None을 반환한다.)
    a_tag = movie.select_one('td.title > div > a') 
    if a_tag is not None:
        # a의 text를 찍어본다.
        print (a_tag.text)
```





### beautifoulsoup 사용법

```python
# 선택자를 사용하는 방법 (copy selector)
soup.select('태그명')
soup.select('.클래스명')
soup.select('#아이디명')

soup.select('상위태그명 > 하위태그명 > 하위태그명')
soup.select('상위태그명.클래스명 > 하위태그명.클래스명')

# 태그와 속성값으로 찾는 방법
soup.select('태그명[속성="값"]')

# 한 개만 가져오고 싶은 경우
soup.select_one('위와 동일')
```

