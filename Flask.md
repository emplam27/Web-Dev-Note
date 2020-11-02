# Flask



### 설치

```cmd
> pip install flask
```



### app.py

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
   return 'Flask Server'

if __name__ == '__main__':  
   app.run('0.0.0.0',port=5000,debug=True)
```



### html랜더링(mvc 패턴)

1. templates폴더에 html파일 생성

2. flask 내장함수 render_template 사용

   ```python
   @app.route('/')
   def home():
      return render_template('index.html')
   ```

   

### html 이미지, css 랜더링

1. static폴더 생성

2. `{{ url_for('static', filename='image.jpg') }}`사용하여 url 표시

   ```html
   <img src="{{ url_for('static', filename='image.jpg') }}"/>
   <link rel="stylesheet" href={{ url_for('static', filename='styple.css') }}>
   ```

   

### GET, POST 요청

```python
@app.route('/test', methods=['GET'])
def test_get():
   title_receive = request.args.get('title_give')
   print(title_receive)
   return jsonify({'result':'success', 'msg': '이 요청은 GET!'})

@app.route('/test', methods=['GET'])
def test_get():
   title_receive = request.args.get('title_give')
   print(title_receive)
   return jsonify({'result':'success', 'msg': '이 요청은 GET!'})
```





## mongoDB 연동



#### 설치

```cmd
> pip install pymongo
```



#### app.py

```python
from pymongo import MongoClient  # pymongo를 임포트 하기(패키지 인스톨 먼저 해야겠죠?)

app = Flask(__name__)

client = MongoClient('localhost', 27017)  # mongoDB는 27017 포트로 돌아갑니다.
db = client.dbsparta  # 'dbsparta'라는 이름의 db를 만들거나 사용합니다.
```

