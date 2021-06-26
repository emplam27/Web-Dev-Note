const targetObject = { name: 'target' };
const proxyObject = new Proxy(targetObject, {
  defineProperty: (target, prop, descriptor) => {
    console.log('defineProperty method 실행');
    console.log(target);
    console.log(prop);
    console.log(descriptor);
    return true;
  },
});

// defineProperty method 실행
// { name: 'target' }
// name
// { value: 'proxy' }
proxyObject.name = 'proxy';
