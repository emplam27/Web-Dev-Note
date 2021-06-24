const targetObject = { name: 'target' };
const proxyObject = new Proxy(targetObject, {
  get: (target, prop) => {
    console.log('get method 실행');
    return 1;
  },
});

// get method 실행
// 1
console.log(proxyObject.name);
