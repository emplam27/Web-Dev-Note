# DB (SQLite)





## 기본용어



- RDBMS : 관계형 모델을 기반으로 하는 데이터베이스 관리 시스템(Oracle, MySQL, SQLite 등등..)
  - 관계형 데이터베이스는 관계를 열과 행으로 이루어진 테이블 집합으로 구성
  - 테이블의 각 열에 특정 종류의 데이터를 기록
  - 테이블의 각 행에 객체/엔터티와 관련된 값 기록 
- NOSQL : 관계가 없음. key, value형태로 이루어진 자료, 관계형이 아닌 모든 DB를 뜻하는 것



- 스키마: 데이터베이스에서 자료의 구조와 제약 조건(구조, 표현방법, 관계 등)에 관한 전반적인 명세

  - ex)

    | Column # |   Field    |     Type     | Not Null | Default Value | Primary Key |
    | -------: | :--------: | :----------: | :------: | :-----------: | :---------: |
    |        0 |     id     |   integer    |   Yes    |     None      |     Yes     |
    |        1 |   title    | varchar(100) |   Yes    |     None      |     No      |
    |        2 |  content   |     text     |   Yes    |     None      |     No      |
    |        3 | created_at |   datetime   |   Yes    |     None      |     No      |
    |        4 | updated_at |   datetime   |   Yes    |     None      |     No      |



- 테이블(관계) : 열과 행의 모델을 사용해 조직된 데이터 요소들의 집합
- Column(열), 속성 : 고유한 데이터 형식을 지님. 
- row(행), 레코드 : 테이블의 데이터는 행으로 저장되며, 정보의 갯수에 따라 행의 갯수를 가짐
- PK(Primary Key / 기본키) : 각 행의 고유값으로 저장된 레코드를 고유하게 식별할 수 있는 값





## SQL

정의

Structured Query Language, 데이터베이스에서 데이터를 저장하거나 얻기 위해서 사용하는 표준화된 언어



|                        분류                         |                             개념                             |              예시               |
| :-------------------------------------------------: | :----------------------------------------------------------: | :-----------------------------: |
|  DDL - 데이터 정의 언어 (Data Definition Language)  | 데이터 정의, 관계형 데이터베이스 구조(테이블, 스키마)를 정의하기 위한 명령어 |       CREATE, DROP, ALTER       |
| DML - 데이터 조작 언어 (Data Manipulation Language) |               데이터 저장, 수정, 삭제, 조회 등               | INSERT, UPDATE, DELETE, SELECT  |
|   DCL - 데이터 제어 언어 (Data Control Language)    |              데이터베이스 사용자의 권한 제어 등              | GRANT, REVOKE, COMMIT, ROLLBACK |



**쿼리(Query) 란?**



 쿼리란 데이터베이스에 정보를 요청하는 것이다.

 쿼리는 웹 서버에 특정한 정보를 보여달라는 웹 클라이언트 요청(주로 문자열을 기반으로 한 요청이다)에 의한 처리이다.

 쿼리는 대개 데이터베이스로부터 특정한 주제어나 어귀를 찾기 위해 사용된다. 주제어가 검색엔진의 검색필드 내에 입력된 다음, 그 내용이 웹 서버로 넘겨진다.









## SQL



### Table 생성

- django

  ```python
  # django
  class User(models.Model):
      first_name = models.CharField(max_length=10)
      last_name = models.CharField(max_length=10)
      age = models.IntegerField()
      country = models.CharField(max_length=10)
      phone = models.CharField(max_length=15)
      balance = models.IntegerField()
      
  # python manage.py makemigrations
  # python manage.py migrate
  ```

- SQL

  ```sql
  -- sql
  CREATE TABLE flights (
      -- 이름 타입 (옵션),
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      flight_num TEXT NOT NULL,
      departure TEXT NOT NULL,
      waypoint TEXT NOT NULL,
      arrival TEXT NOT NULL,
      price INTEGER NOT NULL
  );
  ```



### 기본 CRUD 로직

1. 모든 user 레코드 조회 **SELECT * FROM table**

   ```python
   # orm
   users = User.objects.all()
   type(users)
   #=> django.db.models.query.QuerySet
   print(users.query) 
   # queryset만 sql문 출력 가능
   #=> SELECT "users_user"."id", "users_user"."first_name", "users_user"."last_name", "users_user"."age", "users_user"."country", "users_user"."phone", "users_user"."balance" FROM "users_user"
   ```

      ```sql
   -- sql
   SELECT * FROM users_user;
   
   id | first_name | last_name | age | country | phone | balance
   1 | 정호 | 유 | 40 | 전라북도 | 016-7280-2855 | 370
   ...
      ```

2. user 레코드 생성 **INSERT INTO**

   ```python
   # orm
   User.objects.create(
   	first_name='구름',
       last_name='김',
       age=100,
       country='제주도',
       phone='010-1234-1234',
       balance=10000000000000
   )
   ```

   ```sql
   -- sql
   INSERT INTO flights VALUES(1, 'RT9122', 'Madrid', 'Beijing', 'Incheon', 200);
   
   -- 이와같이하면 id값에 지정한 AUTOINCREMENT를 사용하게 된다.
   INSERT INTO flights (flight_num, departure, waypoint, arrival, price)
   VALUES('XZ0352', 'LA', 'Moscow', 'Incheon', 800);
   INSERT INTO flights (flight_num, departure, waypoint, arrival, price)
   VALUES('SQ0972', 'London', 'Beijing', 'Sydney', 500);
   ```

   * 하나의 레코드를 빼고 작성 후 `NOT NULL` constraint 오류를 orm과 sql에서 모두 확인 해보세요.

     ```python
     # orm
     IntegrityError: NOT NULL constraint failed: users_user.age
     ```

     ```sql
     -- sql
     Error: NOT NULL constraint failed: users_user.last_name
     ```

3. 해당 user 레코드 조회 **SELECT**

   ```python
   # orm
   User.objects.get(id=100)
   #=> <User: User object (100)>
   ```

   * `get` 은 쿼리 결과가 반드시 하나여야 한다. 이외에는 모두 오류를 반환한다.

     ```python
     User.objects.get(last_name='김')
     # MultipleObjectsReturned: get() returned more than one User -- it returned 24!
     User.objects.get(id=1000)
     # DoesNotExist: User matching query does not exist.
     ```

     ```sql
     -- sql
     SELECT * FROM users_user WHERE id = 100;
     
     SELECT waypoint FROM flights;
     SELECT DISTINCT waypoint FROM flights; -- DISTINCT : 중복제거
     ```

4. 해당 user 레코드 수정 **UPDATE**

   ```python
   # orm
   user = User.objects.get(id=100)  #
   user.last_name = '성'
   user.save()
   ```

   ```sql
   -- sql
   UPDATE users_user
   SET last_name='최'
   WHERE id = 100;
   ```

5. 해당 user 레코드 삭제 **DELETE**

   ```python
   # orm
   User.objects.get(id=101).delete()
   ```

   ```sql
   -- sql
   DELETE FROM users_user
   WHERE id = 102;
   ```

6. 테이블 삭제 **DROP**, 테이블 이름 변경 **ALTER**

   ```sql
   DROP TABLE flights;
   
   -- 테이블 이름을 변경할때는 ALTER TABLE __ RENAME TO __
   -- 테이블의 이름을 hotels로 변경하시오.
   ALTER TABLE countries RENAME TO hotels;
   ```

   



### 조건에 따른 쿼리문

1. 수 세기 **COUNT()**

   ```python
   # orm
   User.objects.count()
   ```

   ```sql
   -- sql
   SELECT COUNT(*) FROM users_user;
   COUNT(id)
   100
   ```

2. 조건 **WHERE**

   ```python
   # orm
   User.objects.filter(age=30)
   #=> <QuerySet [<User: User object (5)>, <User: User object (57)>, <User: User object (60)>]>
   
   User.objects.filter(age=30).values('first_name')
   #=> <QuerySet [{'first_name': '영환'}, {'first_name': '보람'}, {'first_name': '은영'}]>
   
   type(User.objects.filter(age=30).values('first_name')[0])  
   #=> dict
   
   print(User.objects.filter(age=30).values('first_name').query)  
   #=> SELECT "users_user"."first_name" FROM "users_user" WHERE "users_user"."age" = 30
   ```

   ```sql
   -- sql
   SELECT first_name FROM users_user
   WHERE age = 30;
   first_name
   영환
   보람
   은영
   
   -- 항공권 가격이 600 미만인 항공편들의 id와 flight_num을 조회하시오.
   SELECT id, Flight_num FROM flights WHERE price < 600;
   SELECT id, Flight_num, price FROM flights WHERE price < 600;
   ```

3. 대소관계 비교 `__`

   > 대소관계
   >
   > `__gte` : >=
   >
   > `__gt` : >
   >
   > `__lte` : <=
   >
   > `__lt` : <

   ```python
   # orm
   User.objects.filter(age__gte=30)
   print(User.objects.filter(age__gte=30).query)
   # SELECT "users_user"."id", "users_user"."first_name", "users_user"."last_name", "users_user"."age", "users_user"."country", "users_user"."phone", "users_user"."balance" FROM "users_user" WHERE "users_user"."age" >= 30
   User.objects.filter(age__gte=30).count()
   ```

   ```sql
   -- sql
   SELECT COUNT(*) FROM users_user
   WHERE age >= 30;
   
   COUNT(*)
   43
   
   -- 도착지가 Incheon이고 가격이 500 이상인 항공편의 departure를 조회하시오
   SELECT departure FROM flights WHERE price >= 500 AND arrival = 'Incheon';
   ```

4. 연속조건 **AND OR**

   ```python
   # orm -1 
   User.objects.filter(age=30).filter(last_name='김').count()
   # orm -2
   User.objects.filter(age=30, last_name='김').count()
   # query
   print(User.objects.filter(age=30).filter(last_name='김').query)
   # => SELECT "users_user"."id", "users_user"."first_name", "users_user"."last_name", "users_user"."age", "users_user"."country", "users_user"."phone", "users_user"."balance" FROM "users_user" WHERE ("users_user"."age" = 30 AND "users_user"."last_name" = 김)
   ```

   ```sql
   -- sql
   SELECT COUNT(*) FROM users_user
   WHERE age = 30 AND last_name = '김';
   
   
   -- 6. 객실의 위치가 지하 혹은 등급이 deluxe인 객실의 모든 정보를 조회하시오.
   SELECT * FROM hotels
   WHERE (room_num LIKE 'B%') OR (grade = 'deluxe');
   ```

5. 문자열 시작 & 끝 조건 **LIKE % __**

   > https://docs.djangoproject.com/en/2.2/topics/db/queries/#escaping-percent-signs-and-underscores-in-like-statements
   >
   > ```
   > iexact, contains, icontains, startswith, istartswith, endswith, iendswith
   > ```

   ```python
   # orm
   User.objects.filter(phone__startswith='02-').count()
   
   # query
   print(User.objects.filter(phone__startswith='02-').query)
   #=> SELECT "users_user"."id", "users_user"."first_name", "users_user"."last_name", "users_user"."age", "users_user"."country", "users_user"."phone", "users_user"."balance" FROM "users_user" WHERE "users_user"."phone" LIKE 02-% ESCAPE '\'
   ```

   ```sql
   -- sql
   -- % : 길이 상관 x    예시) a로 시작하는 이름:            name LIKE 'a%'
   -- _ : 한 캐릭터      예시) a로 시작하는 3글자인 이름:    name LIKE 'a__'
   
   -- 7. 항공편의 숫자부분이 0으로 시작하고 2로 끝나면서 경유지가 Beijing인 항공편들의
   --     id와 flight_num을 조회하시오.
   SELECT id, flight_num FROM flights WHERE flight_num LIKE '%0%2' AND waypoint = 'Beijing';
   -- 이것도 가능하긴 함
   SELECT id, flight_num FROM flights WHERE flight_num LIKE '%2' AND flight_num LIKE '%0%' AND waypoint = 'Beijing';
   ```

6. 차순 정렬 **ORDER_BY, ASC, DESC**

   ```python
   # orm
   ```

   ```sql
   -- sql
   
   -- 객실 가격을 내림차순으로 정렬하여 상위 2개의 room_num와 price를 조회하시오.
   SELECT room_num, price FROM hotels
   ORDER BY price DESC LIMIT 2;
   -- 오름차순 : ASC
   
   -- 지상층 객실이면서 2020년 1월 4일에 체크인 한 객실의 목록을 price 오름차순으로 조회하시오.
   SELECT * FROM hotels
   WHERE (room_num NOT LIKE 'B%') AND (check_in = '2020-01-04')
   ORDER BY price ASC;
   ```



### 정렬 및 LIMIT, OFFSET

1. 나이가 많은 사람 10명(내림차순)

   ```python
   # orm
   User.objects.order_by('-age')[:10]
   
   # query
   print(User.objects.order_by('-age')[:10].query)
   #=> SELECT "users_user"."id", "users_user"."first_name", "users_user"."last_name", "users_user"."age", "users_user"."country", "users_user"."phone", "users_user"."balance" FROM "users_user" ORDER BY "users_user"."age" DESC  LIMIT 10
   ```

   ```sql
   -- sql
   SELECT * FROM users_user
   ORDER BY age DESC
   LIMIT 10;
   
   id | first_name | last_name | age | country | phone | balance
   1 | 정호 | 유 | 40 | 전라북도 | 016-7280-2855 | 370
   4 | 미경 | 장 | 40 | 충청남도 | 011-9079-4419 | 250000
   28 | 성현 | 박 | 40 | 경상남도 | 011-2884-6546 | 580000
   ```

2. 잔액이 적은 사람 10명 (오름차순)

   ```python
   # orm
   User.objects.order_by('balance')[:10]
   ```

   ```sql
   -- sql
   SELECT * FROM users_user
   ORDER BY balance ASC
   LIMIT 10;
   ```

3. 성, 이름 내림차순 순으로 5번째 있는 사람

   ```python
   # orm
   User.objects.order_by('-last_name', '-first_name')[4]
   #=>  <User: User object (67)>
   ```

   ```sql
   -- sql
   SELECT * FROM users_user
   ORDER BY last_name DESC, first_name DESC
   LIMIT 1 OFFSET 4;
   
   id | first_name | last_name | age | country | phone | balance
   67 | 보람 | 허 | 28 | 충청북도 | 016-4392-9432 | 82000
   ```



### 표현식

> 표현식을 위해서는 [aggregate]([https://docs.djangoproject.com/en/2.2/topics/db/aggregation/](https://docs.djangoproject.com/en/2.2/topics/db/aggregation/)) 를 알아야한다.

1. 평균 **AVG()**

   ```python
   # orm
   from django.db.models import Avg
   User.objects.aggregate(Avg('age'))
   #=> {'age__avg': 28.23}
   ```

   ```sql
   -- sql
   SELECT AVG(age) FROM users_user;
   AVG(age)
   28.23
   ```

   

   ```python
   # orm
   from django.db.models import Avg
   User.objects.filter(last_name='김').aggregate(Avg('age'))
   ```

   ```sql
   -- sql
   SELECT AVG(age) FROM users_user
   WHERE last_name = '김';
   ```

2. 최대값 **MAX**

   ```python
   # orm
   from django.db.models import Max
   User.objects.aggregate(Max('balance'))
   ```

   ```sql
   -- sql
   SELECT MAX(balance) FROM users_user;
   ```

3. 총합 **SUM**

   ```python
   # orm
   from django.db.models import Sum
   User.objects.aggregate(Sum('balance'))
   ```

   ```sql
   -- sql
   SELECT SUM(balance) FROM users_user;
   ```



### Group by

> annotate는 개별 item에 추가 필드를 구성한다.
> 추후 1:N 관계에서 활용된다.

1. 그룹묶기 GROUP_BY

   ```python
   # orm
   User.objects.values('country')
    # <QuerySet [{'country': '전라북도'}, {'country': '경상남도'}, {'country': '전라남도'}, ...
   from django.db.models import Count
   User.objects.values('country').annotate(Count('country'))
   # <QuerySet [{'country': '강원도', 'country__count': 14}, {'country': '경기도', 'country__count': 9}, {'country': '경상남도', 'country__count': 9}, {'country': '경상북도', 'country__count': 15}, {'country': '전라남도', 'country__count': 10}, {'country': '전라북도', 'country__count': 11}, {'country': '제주특별자치도', 'country__count': 9}, {'country': '충청남도', 'country__count': 9}, {'country': '충청북도', 'country__count': 14}]>
   ```

   ```sql
   -- sql
   SELECT country, COUNT(country) FROM users_user
   GROUP BY country;
   
   country | COUNT(country)
   강원도 | 14
   경기도 | 9
   경상남도 | 9
   경상북도 | 15
   전라남도 | 10
   전라북도 | 11
   제주특별자치도 | 9
   충청남도 | 9
   충청북도 | 14
   
   
   
   -- grade 별로 분류하고 분류된 grade 개수를 내림차순으로 조회하시오.
   SELECT grade, COUNT(grade) FROM hotels
   GROUP BY grade 
   ORDER BY COUNT(grade) DESC;
   ```













## ORM



### SQL문으로 변환



#### 중요

- filter는 quertset을 반환

- get은 object를 반환





1. 전체 데이터를 조회 **.all()**

```sqlite
-- user 테이블 전체 데이터를 조회

User.objects.all()

SELECT "users_user"."id",
       "users_user"."first_name",
       "users_user"."last_name",
       "users_user"."age",
       "users_user"."country",
       "users_user"."phone",
       "users_user"."balance"
  FROM "users_user"
 LIMIT 21
```



2. 조건을 통해 단일 데이터 가져오기 **.get(조건)**, 복수의 데이터 가져오기 **.filter(조건)**

```sqlite
-- id가 19인 사림의 age를 조회하시오.
User.objects.get(id = 19).age 

SELECT "users_user"."id",
       "users_user"."first_name",
       "users_user"."last_name",
       "users_user"."age",
       "users_user"."country",
       "users_user"."phone",
       "users_user"."balance"
  FROM "users_user"
 WHERE "users_user"."id" = 19


User.objects.filter(id = 19).values('age')

SELECT "users_user"."age"
  FROM "users_user"
 WHERE "users_user"."id" = 19
 LIMIT 21
```



3. 특정 column의 데이터 가져오기 **.value('column')**

```sqlite
-- 모든 사람의 age를 조회하시오.

User.objects.all().values('age')  -- values : 특정 column의 값만 가지고 오겠다는 의미

SELECT "users_user"."age"
  FROM "users_user"
 LIMIT 21


User.objects.values('age')

SELECT "users_user"."age"
  FROM "users_user"
 LIMIT 21
```



4. lookup 조건문

> exact : 정확히 일치하는 조건, None가능
>
> contains : 대소문자를 구분하여 내용을 포함하고 있는 조건
>
> icontains : 대소문자를 구분하지 않고 내용을 포함하고 있는 조건
>
> in : 해당 배열에 포함되는 조건
>
> gt(greater than) : 초과
>
> gte(greater than or equal) : 이상
>
> lte(less than) : 이하
>
> lt(less than or equal) : 미만
>
> startswith : 해당 문자로 시작하는 조건
>
> istartswith : 대소문자를 구분하지 않고 해당 문자로 시작하는 조건
>
> endswith : 해당 문자로 끝나는 조건
>
> iendswith : 대소문자를 구분하지 않고 해당 문자로 끝나는 조건

```sqlite
-- age가 40 이하인 사림들의 id와 balance를 조회하시오.

-- lte : less than equal, 작거나 같다
User.objects.filter(age__lte=40).values('id', 'balance')  

SELECT "users_user"."id",
       "users_user"."balance"
  FROM "users_user"
 WHERE "users_user"."age" <= 40
 LIMIT 21
```



```sqlite
-- last_name이 ‘김’이고 balance가 500 이상인 사람들의 first_name을 조회하시오.

User.objects.filter(last_name='김', balance__gte=500).values('first_name')

SELECT "users_user"."first_name"
  FROM "users_user"
 WHERE ("users_user"."balance" >= 500 AND "users_user"."last_name" = '김')
 LIMIT 21
```



```sqlite
-- first_name이 ‘수’로 끝나면서 행정구역이 경기도인 사람들의 balance를 조회하시오.

User.objects.filter(first_name__endswith='수', country='경기도').values('balance')

SELECT "users_user"."balance"
  FROM "users_user"
 WHERE ("users_user"."country" = '경기도' AND "users_user"."first_name" LIKE '%수' ESCAPE '\')
 LIMIT 21
        
-- User.objects.filter(first_name__endswith='수', country='경기도').values('balance')
```



```sqlite
-- phone에 ‘123’을 포함하고 age가 30미만인 정보를 조회하시오.

-- contains : 대소문자 구분을 하며 포함하는 것
-- icontains : 대소문자 구분을 안하며 포함하는 것
User.objects.filter(phone__contains='123', age__lt=30)

SELECT "users_user"."id",
       "users_user"."first_name",
       "users_user"."last_name",
       "users_user"."age",
       "users_user"."country",
       "users_user"."phone",
       "users_user"."balance"
  FROM "users_user"
 WHERE ("users_user"."age" < 30 AND "users_user"."phone" LIKE '%123%' ESCAPE '\')
 LIMIT 21
```



5. 수 세기 **.count()**

```sqlite
-- balance가 2000 이상이거나 age가 40 이하인 사람의 총 인원수를 구하시오.

-- Q를 사용하면 조건문을 연속으로 사용할 수 있음
from django.db.models import Q
User.objects.filter(Q(balance__gte=2000) | Q(age__lte=40)).count()

SELECT COUNT(*) AS "__count"
  FROM "users_user"
 WHERE ("users_user"."balance" >= 2000 OR "users_user"."age" <= 40)
```



```sqlite
-- phone 앞자리가 ‘010’으로 시작하는 사람의 총원을 구하시오.

User.objects.filter(phone__startswith='010').count()

SELECT COUNT(*) AS "__count"
  FROM "users_user"
 WHERE "users_user"."phone" LIKE '010%' ESCAPE '\'
```



6. 데이터 수정하기 **.update(변경내용)**

```sqlite
-- 이름이 ‘김옥자’인 사람의 행정구역을 경기도로 수정하시오.

User.objects.filter(first_name='옥자',last_name='김').update(country='경기도')

UPDATE "users_user"
   SET "country" = '경기도'
 WHERE ("users_user"."first_name" = '옥자' AND "users_user"."last_name" = '김')
```



7. 데이터 삭제하기 **.delete()**

```sqlite
-- 이름이 ‘백진호’인 사람을 삭제하시오
User.objects.filter(first_name='진호',last_name='백').delete()

DELETE
  FROM "users_user"
 WHERE ("users_user"."first_name" = '진호' AND "users_user"."last_name" = '백')
```



8. 순서 **.order_by('+-column')**

```sqlite
-- balance를 기준으로 상위 4명의 first_name, last_name, balance를 조회하시오.

-- 리스트 슬라이싱 사용 가능
User.objects.order_by('-balance').values('first_name', 'last_name', 'balance')[:4]

SELECT "users_user"."first_name",
       "users_user"."last_name",
       "users_user"."balance"
  FROM "users_user"
 ORDER BY "users_user"."balance" DESC
 LIMIT 4
```



9. 중복 없애기 **.distinct()**

```sqlite
-- phone이 ‘010’으로 시작하는 사람들의 행정 구역을 중복 없이 조회하시오.

-- distinct() : 중복 없애기
User.objects.filter(phone__startswith='010').values('country').distinct()

SELECT DISTINCT "users_user"."country"
  FROM "users_user"
 WHERE "users_user"."phone" LIKE '010%' ESCAPE '\'
 LIMIT 21
```



10. 표현식 **.aggregate()**

```sqlite
-- 모든 인원의 평균 age를 구하시오.

from django.db.models import Avg
User.objects.all().aggregate(Avg('age'))
User.objects.aggregate(Avg('age'))

SELECT AVG("users_user"."age") AS "age__avg"
  FROM "users_user"
  
  
  
--박씨의 평균 balance를 구하시오.

from django.db.models import Avg
User.objects.filter(last_name='박').aggregate(Avg('balance'))

SELECT AVG("users_user"."balance") AS "balance__avg"
  FROM "users_user"
 WHERE "users_user"."last_name" = '박'
```



```sqlite
-- 경상북도에 사는 사람 중 가장 많은 balance의 액수를 구하시오.

from django.db.models import Max
User.objects.filter(country='경상북도').aggregate(Max('balance'))

SELECT MAX("users_user"."balance") AS "balance__max"
  FROM "users_user"
 WHERE "users_user"."country" = '경상북도'
```



11. 특정 index 조회 **.first()**, **.end()**

```sqlite
-- 제주특별자치도에 사는 사람 중 balance가 가장 많은 사람의 first_name을 구하시오.

-- 제일 윗 값 조회는 .first() 또는 인덱싱[0]으로 가능
User.objects.filter(country='제주특별자치도').order_by('-balance').values('first_name').first()

User.objects.filter(country='제주특별자치도').order_by('-balance').first().first_name

User.objects.filter(country='제주특별자치도').order_by('-balance').values('first_name')[0]

User.objects.filter(country='제주특별자치도').aggregate(Max('balance')).values('first_name').first()

SELECT MAX("users_user"."balance") AS "balance__max"
  FROM "users_user"
 WHERE "users_user"."country" = '제주특별자치도'
```

