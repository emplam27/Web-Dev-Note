const targetObject = { name: 'target' };
const proxyObject = new Proxy(targetObject, {
  has: (target, prop) => {
    console.log('has method 실행');
    return true;
  },
});

// has method 실행
// true
console.log('name' in proxyObject);
