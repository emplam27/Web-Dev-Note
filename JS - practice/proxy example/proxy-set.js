const targetObject = { name: 'target' };
const proxyObject = new Proxy(targetObject, {
  set: (target, prop, value) => {
    console.log('set method 실행');
    console.log(`${prop} = ${value}`);
    return true;
  },
});

// set method 실행
// name = proxy
proxyObject.name = 'proxy';
