const proxyObject = new Proxy(function a() {}, {
  construct: (target, argumentsList, newTarget) => {
    console.log('construct method 실행');
    console.log(target);
    console.log(argumentsList);
    console.log(newTarget);
    return { value: argumentsList };
  },
});

// construct method 실행
// [Function: a]
// [ 1, 2, 3, 4, 5 ]
// [Function: a]
// { value: [ 1, 2, 3, 4, 5 ] }
console.log(new proxyObject(1, 2, 3, 4, 5));
