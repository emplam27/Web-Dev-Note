// 잘못된 예시 - Stale Closure
function useState(initialValue) {
  var _val = initialValue;

  function setState(newVal) {
    _val = newVal;
  }

  return [_val, setState];
}

var [foo, setFoo] = useState(0);
console.log(foo); // 0
setFoo(1);
console.log(foo); // 0
