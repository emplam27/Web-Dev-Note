# git flow 간편 사용법





## clone 받기(최초 1회 실행)

```bash
$ git clone 주소
```





## git flow 선언(최초 1회 실행)

```bash
$ git flow init
# 엔터 다다다다다다 치면됨

# develop 브랜치가 없다면 수행
$ git push origin develop

$ git branch --set-upstream-to=origin/develop develop
```





## git flow 사용하여 작업하기 (일일 작업 시)

```bash
# 자신의 작업용 branch 만들기
$ git flow feature start 작업하는_내용(작업자_이름)

# 다른사람과 같이 작업하고 싶다면 브랜치 publish 하기
$ git flow feature publish 작업하는_내용(작업자_이름)

# 공동 작업자는 publish된 branch로 이동하기
$ git flow feature origin 작업하는_내용(작업자_이름)

# branch 이동할 때
$ git checkout 브랜치_이름

# branch의 작업을 끝내고 브랜치 삭제하기
# 공동 작업인 경우는 마지막 작업자가 수행
$ git flow feature finish 작업하는_내용(작업자_이름)

$ git add .
$ git commit -m "커밋 메세지"
$ git push
```



## Merge

- gitlab의 **Merge Request** 탭에 들어가서 맨 위에 `Create Merge Request` 버튼이 생겼는지 확인합니다.
- 제목과 설명을 작성하고 **Merge Request**를 요청합니다.
- 모두가 Merge Request에 **코드리뷰**를 진행합니다. 
- Merge 는 Maintainer 가 할 수 있습니다. (김재경, 안성호)