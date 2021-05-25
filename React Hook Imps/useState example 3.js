// 모듈패턴을 사용하여 컴포넌트 상태 추적, 다만 한개의 컴포넌트만 가능

const MyReact = (function () {
  let _val;
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
  };
})();

function Counter() {
  const [count, setCount] = MyReact.useState(0);
  return {
    click: () => setCount(count + 1),
    render: () => console.log('render:', { count: count }),
  };
}

let App;
App = MyReact.render(Counter); // render: { count: 0 }
console.log(App);
App.click();
App.render(); // render: { count: 0 }
App = MyReact.render(Counter); // render: { count: 1 }
App.render(); // render: { count: 1 }
