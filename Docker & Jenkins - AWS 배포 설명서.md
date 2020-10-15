# 프로젝트 배포 - AWS, Docker, Jenkins



[TOC]



## 1. 서버 접속하기

```shell
$ ssh -i "cert.pem" ubuntu@<도메인_url>
```
>  - 처음 접속시 Are you sure you want to continue connecting (yes/no/[fingerprint])? `yes` 입력
>  - UNPROTECTED PRIVATE KEY FILE! 에러 발생시 권한 설정: `chmod 400 cert.pem`





## 2. Docker



### Docker 설치하기

```shell
$ sudo apt update
$ sudo apt install apt-transport-https ca-certificates curl software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
$ sudo apt update
$ apt-cache policy docker-ce
$ sudo apt install docker-ce

# docker 구동 확인
$ sudo service docker status
```



### Docker Compose 설치하기

```shell
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose

# 설치 확인
$ docker-compose --version

# 동작
$ docker-compose -f docker-compose.yml build
```





### Docker 동작

> 이미지: 특정한 서버 파일을 부르는 단위 이름. 서버 파일을 사진을 찍어 이미지로 저장해놨다고 생각
>
> 컨테이너: 해당 이미지를 통해 구성한 가상의 서버환경

```shell
=========== # 이미지 관련 명령어 ==========

# 서버 이미지 받아오기
$ docker pull hello-world

# 받아온 이미지 확인하기
$ docker images

# 이미지 삭제하기
$ docker rmi 이미지_id


========== # 컨테이너 관련 명령어 ==========

# hello-world 컨테이너 실행
$ docker run hello-world

# 컨테이너 동작 재실행 & 실행 &정지
$ docker <restart or start or stop> 컨테이너_id

# 동작중인 컨테이너 확인
$ docker ps -a

# 컨테이너 삭제하기(image file은 남아있음, 언제든지 image를 통해 재시작 가능)
$ docker rm 

# 종료된 컨테이너 목록 삭제
$ sudo docker ps -a | grep Exit | cut -d ' ' -f 1 | xargs sudo docker rm

# 컨테이너 접속하기
$ docker exec -it 컨테이너_id /bin/bash
```





## 4. Docker 컨테이너 만들기 (MongoDB, Geth)



### MongoDB 컨테이너

> 경로 연결을 통해 서버에 DB를 저장. 컨테이너가 종료되어도 DB 자료는 사라지지 않음

```shell
$ docker pull mongo

# mongodb 컨테이너 실행하기
$ docker run --name mongodb -v ~/mongodb/db:/data/db -d -p 5000:27017 mongo

# 컨테이너 접속하기
$ docker exec -it mongodb /bin/bash
```

> `--name`: 컨테이너 이름 설정
>
> `-v`: <호스트의 경로> : <컨테이너의 경로> 연결
>
> `-d`: Detached 모드, 컨테이너를 백드라운드에서 동작
>
> `-p`: 포트 포워딩. 호스트에 접속한 포트번호를 컨테이너의 포트번호로 넘겨줌. 
> <호스트 port> : <컨테이너 port>
>
> `-it`: 컨테이너를 종료하지 않으면서 터미널의 입력을 컨테이너로 전달하기 위해 사용
>
> 마지막에 이미지 이름, `-auth` 사용해서 보안 로그인 가능



### Geth 컨테이너

```shell
$ docker pull ethereum/client-go

# genesis.json 생성하기
$ mkdir docker_ethereum/eth_data
$ cd docker_ethereum/eth_data
$ vi genesis.json

# genesis 블럭 생성하기, geth & keystore 폴더가 생성되었다면 성공
$ docker run -v $(pwd)/eth_data:/root/.ethereum ethereum/client-go init /root/.ethereum/genesis.json

# geth 컨테이너 실행하기
$ docker run -it -p 30303:30303 -p 8545:8545 -v $(pwd)/eth_data:/root/.ethereum --name geth ethereum/client-go --datadir /root/.ethereum --networkid 4649 --nodiscover --maxpeers 0 --rpc --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcapi "admin,db,eth,debug,miner,net,shh,txpool,personal,web3" --allow-insecure-unlock console

# rpc로 geth 컨테이너 접속하기, 접속 종료하기
$ geth attach rpc:http://localhost:8545
$ exit
```













## 3. NGINX & HTTPS



### NGINX 설치

```shell
$ sudo apt-get update
$ sudo apt-get upgrade
$ sudo apt-get install nginx
```



### NGINX 환경설정

```nginx
$ cd /etc/nginx/sites-available
$ vi default

# default 파일 수정
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /home/ubuntu/frontend/dist;  # frontend 배포 파일 경로

        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {  # / 링크로 접속하면
                try_files $uri $uri/ /index.html;  # index.html 파일 보여주기
        }
		
		# Backend
        location /api {  # /api 링크로 접속하면
                proxy_pass http://localhost:8080;  # backend 서버로 접속
                proxy_redirect off;
                charset utf-8;


                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Nginx-Proxy true;
        }
}
```



### HTTPS 적용

```shell
# certbot 설치
$ sudo add-apt-repository ppa:certbot/certbot
$ sudo apt-get install python-certbot-nginx

# ssl 설치
$ sudo certbot --nginx -d <도메인_이름>
# 이메일 등록, 약관 동의 2회 이후 설정
# 1을 입력한다면 http 연결을 https로 리다이렉트 하지 않음 (http url이 살아있음)
# 2를 입력한다면 http 연결을 https 로 리다이렉

# certbot 갱신 (갱신 커멘트 위치: /etc/cron.d)
$ sudo certbot renew
```



### default 설정 수정

```nginx
$ cd /etc/nginx/sites-available
$ vi default

# default 파일 수정
server {

    listen 443 ssl;
    listen [::]:443 ssl ipv6only=on;
	
    server_name j03b103.p.ssafy.io;

    root /home/ubuntu/frontend/dist;
    index   index.htm index.nginx-debian.html;

    # frontend
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend
    location /static {
        alias /home/ubuntu/backend/static;
    }
    location /image {
        alias /home/ubuntu/backend/media;
    }
    location /api {
        proxy_pass http://localhost:8080;
        proxy_redirect off;
        charset utf-8;
        proxy_set_header X-Real-IP $remote_addr;     
    }

    ssl_certificate /etc/letsencrypt/live/j3b103.p.ssafy.io/fullchain.pem; 
    ssl_certificate_key /etc/letsencrypt/live/j3b103.p.ssafy.io/privkey.pem; 
    include /etc/letsencrypt/options-ssl-nginx.conf; 
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; 

}

server {

    if ($host = j03b103.p.ssafy.io) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    listen [::]:80;
    listen 8080;
    listen [::]:8080;

    server_name j03b103.p.ssafy.io;

    return 404;

}
```











## 5. Frontend 배포 - Vue, Typescript

> JS와 같이 `npm run build`사용



### tsconfig.json 설정

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env",
      "vuetify"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ],
    "typeRoots": [
      "./node_modules/@types",
      "./node_modules/vuetify/types"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```







## 6. Backend 배포 - Typescript, PM2

> Node JS 무중단 배포 툴



### 설치

```shell
$ npm install -g pm2
```



### 명령어

```shell
# 서버 구동
# --name 이름: 해당 이름으로 서버 구동
# `-o ./이름.log`: 표준출력으로 `이름.log`에 모든 log가 기록됨
$ pm2 start server.js 

# 서버 작동 내역
$ pm2 list  

# 서버 작동 중지
$ pm2 stop 이름 or 아이디  

# 서버 작동 내역 삭제
$ pm2 delete 이름 or 아이디 

# 프로세스 모니터링
$ pm2 monit  
```





## 7. Jenkins CI/CD 구축



### (선택) Jenkins 직접 설치

```shell
$ sudo wget -q -O - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | sudo apt-key add -

$ echo deb http://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list

$ sudo apt-get update && sudo apt-get install -y jenkins

# 작동되는지 확인
$ sudo service jenkins restart
$ sudo systemctl status jenkins

# 비밀번호 확인
$ sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```





### (선택) Docker로 Jenkins 컨테이너 만들기

```shell
$ docker pull jenkins/jenkins

========== # jenkins 컨테이너 실행하기 ==========
# -p: 서버의 9000번 포트와 컨테이너의 808포트 연결 실행
# -v: 서버의 경로:컨테이너 경로 연결
$ docker run -d -p 9000:8080 -v /jenkins:/var/jenkins_home --name jenkins -u root jenkins/jenkins

# 초기 비밀번호 확인
$ docker exec 컨테이너_id cat /var/jenkins_home/secrets/initialAdminPassword
```





### Jenkins 환경설정



#### 소스코드

![캡처3](https://user-images.githubusercontent.com/60080670/95745035-5b08d080-0ccf-11eb-9917-861dafc67766.PNG)

#### 빌드 API

![캡처4](https://user-images.githubusercontent.com/60080670/95745101-7378eb00-0ccf-11eb-8522-adfee220ce8e.PNG)

#### 빌드 명령어

![캡처2](https://user-images.githubusercontent.com/60080670/95745021-53e1c280-0ccf-11eb-9f7f-b92748fa2989.PNG)

![캡처](https://user-images.githubusercontent.com/60080670/95745079-6bb94680-0ccf-11eb-81b1-9b059c4b8d84.PNG)





## 8. Socket.io & Redis 서버 Docker Compose로 구동



### Docker Compose 설정

- Redis Server: `localhost:6379`
- Chat Backend Server: `localhost:3000`

```yaml
version: '3'

services:
	
  # Redis
  redis:
    image: redis:4.0.5-alpine
    networks:
      - video-chat
    ports:
      - 6379:6379
    expose:
      - "6379"
    restart: always
    command: ["redis-server", "--appendonly", "yes"]

  # Chat Backend
  # 여러개 만들어서 분산서버 가능
  chat1:
    build: 
      context: .
      args:
        VUE_APP_SOCKET_HOST: https://j3b103.p.ssafy.io
        VUE_APP_SOCKET_PORT: 443 
    ports: 
      - 3000:3000
    networks:
      - video-chat
    depends_on:
      - redis
    environment:
      PORT: 3000
      REDIS_HOST: redis
      REDIS_PORT: 6379
  
  
networks:
  video-chat:
```





### Socker.io 서버를 위한 nginx 설정

```nginx
server {
        listen 443 ssl;
        listen [::]:443 ssl ipv6only=on;

        server_name j3b103.p.ssafy.io;

        root /home/ubuntu/frontend/dist;
        index index.html index.htm index.nignx-debian.html;

        location / {
                try_files $uri $uri/ /index.html;
        }

        location /static {
                alias /home/ubuntu/backend/static;
        }
        location /image {
                alias /home/ubuntu/backend/media;
        }
        location /api {
                proxy_pass http://localhost:8080;
                proxy_redirect off;
                charset utf-8;
                proxy_set_header X-Real-IP $remote_addr;
        }
    	
		# 화상채팅 Frontend
        location /chat {
                alias /home/ubuntu/chat-frontend/dist;
                sub_filter /js/ /chat/js/;
                sub_filter /css/ /chat/css/;
                sub_filter /img/ /chat/img/;
                sub_filter_once off;
                sub_filter_types *;
                error_page 405 =200 $uri;
        }

    	# 화상채팅 Backend
        location /chat/api {
                proxy_set_header X-Real-IP $remote_addr;
                charset urf-8;
                proxy_pass http://localhost:3000;
                proxy_redirect off;
        }

    	# Socket.io
        location /socket.io {
                proxy_pass http://localhost:3000/socket.io;
                proxy_set_header   X-Forwarded-For $remote_addr;
                proxy_set_header   Host $http_host;
                proxy_http_version 1.1;
                proxy_set_header   Upgrade $http_upgrade;
                proxy_set_header   Connection "upgrade";
        }


        ssl_certificate /etc/letsencrypt/live/j3b103.p.ssafy.io/fullchain.pem; 
        ssl_certificate_key /etc/letsencrypt/live/j3b103.p.ssafy.io/privkey.pem; 
        include /etc/letsencrypt/options-ssl-nginx.conf; 
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {

        if ($host = j3b103.p.ssafy.io) {
                return 301 https://$host$request_uri;
        }


        listen 80;
        listen [::]:80;

        server_name j3b103.p.ssafy.io;

        return 404;

}
```





### Frontend Base경로 설정

> 화상 채팅 Frontend가 `/chat`으로 시작하기 때문에 Base경로 설정이 필요함

```js
// vue.config.js 
module.exports = {
  publicPath: "/chat",
}
```



