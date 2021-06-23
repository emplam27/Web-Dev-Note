const targetObject = { name: 'target' };
const proxyObject = new Proxy(targetObject, {
  get: (target, prop) => {
    console.log('get method 실행');
    if (prop in target) {
      return target[prop];
    } else {
      return 0;
    }
  },
  has: (target, prop) => {
    console.log('has method 실행');
    return false;
  },
});

// 기본적인 객체 접근
console.log(targetObject.name); // target 출력

// proxy 객체의 요소에 접근하게 되면 proxy객체에 선언한 get 메서드가 실행됨
console.log(proxyObject.name); // get method 실행, target 출력

// proxy 객체의 요소에 접근하게 되면 proxy객체에 set 메서드가 선언되었는지 찾음
// set 메서드가 proxy 객체에 없기 때문에 targetObject의 set 메서드가 실행
proxyObject.name = 'proxy';
console.log(targetObject.name); // proxy 출력

// proxy 객체의 요소를 변경하게 되면 proxy객체에 선언한 has 메서드가 실행됨
console.log('name' in proxyObject); // 'has method 실행', 'false' 출력
