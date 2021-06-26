const targetObject = { name: 'target' };
const proxyObject = new Proxy(targetObject, {
  deleteProperty: (target, prop) => {
    console.log('deleteProperty method 실행');
    console.log(target);
    console.log(prop);
    return true;
  },
});

// deleteProperty method 실행
// { name: 'target' }
// name
delete proxyObject.name;
