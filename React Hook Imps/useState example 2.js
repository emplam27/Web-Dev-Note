// 정상적으로 작동하지만, state값을 가져오기 위해서 getter 함수를 실행해야 함

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

function Counter() {
  const [count, setCount] = useState(0);
  return {
    click: () => setCount(count() + 1),
    render: () => console.log('render:', { count: count() }),
  };
}

const counter = Counter();
counter.render(); // render: { count: 0 }
counter.click();
counter.render(); // render: { count: 1 }
