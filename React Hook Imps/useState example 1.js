// useState - getter, setter를 이용하여 구현한 방식

function useState(initialValue) {
  var _val = initialValue;

  function state() {
    return _val;
  }

  function setState(newVal) {
    _val = newVal;
  }

  return [state, setState];
}

var [foo, setFoo] = useState(0);
console.log(foo()); // 0
setFoo(1);
console.log(foo()); // 1
