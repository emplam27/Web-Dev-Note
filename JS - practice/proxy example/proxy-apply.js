function a() {}
const proxyObject = new Proxy(a, {
  apply: (target, thisArg, argumentsList) => {
    console.log('construct method 실행');
    console.log(target);
    console.log(thisArg);
    console.log(argumentsList);
    return '함수실행';
  },
});

// construct method 실행
// [Function: a]
// undefined
// [ 1, 2, 3, 4, 5 ]
// 함수실행
console.log(proxyObject(1, 2, 3, 4, 5));
