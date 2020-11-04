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



```python
import requests
from bs4 import BeautifulSoup
```

