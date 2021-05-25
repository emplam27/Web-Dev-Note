// 의존성 배열 안의 값이 바뀌면, useEffect 실행

const MyReact = (function () {
  let _val, _deps; // deps는 의존성
  return {
    render(Component) {
      const Comp = Component(); // click과 render가 다시 선언되는 효과 => count가 갱신
      Comp.render();
      return Comp;
    },
    useState(initialValue) {
      _val = _val || initialValue;
      function setState(newValue) {
        _val = newValue;
      }
      return [_val, setState];
    },
    useEffect(callback, depArray) {
      const hasNoDeps = !depArray;
      const hasChangedDeps = _deps
        ? !depArray.every((el, i) => el === _deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        _deps = depArray;
      }
    },
  };
})();

function Counter() {
  const [count, setCount] = MyReact.useState(0);

  MyReact.useEffect(() => {
    console.log('effect', { count: count });
  }, [count]);

  return {
    click: () => setCount(count + 1),
    noop: () => setCount(count),
    render: () => console.log('render:', { count: count }),
  };
}

let App;
App = MyReact.render(Counter); // effect: { count: 0 }, render: { count: 0 }
App.click();
App = MyReact.render(Counter); // effect: { count: 1 }, render: { count: 1 }
App.noop();
App = MyReact.render(Counter); // 이팩트 실행 안됨,       render: { count: 1 }
App.click();
App = MyReact.render(Counter); // effect: { count: 2 }, render: { count: 2 }
