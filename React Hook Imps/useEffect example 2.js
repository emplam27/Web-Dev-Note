// 여러개의 state 선언 가능
// setStateHookIndex는 setState에서 currentHook 변수가 덮어 씌워지는 것을 방지
// 해당 부분을 제거하면, 덮어 쓰워진 currentHook은 stale closure 문제를 일으켜 setState를 호출해도 동작하지 않음

const MyReact = (function () {
  let hooks = [];
  let currentHook = 0; // hooks 배열과 반복자
  return {
    render(Component) {
      console.log('hooks', hooks);
      console.log('currentHook', currentHook);
      const Comp = Component(); // useEffect들이 실행
      Comp.render();
      currentHook = 0; // 다음 렌더링을 위해 초기화
      return Comp;
    },
    useState(initialValue) {
      console.log('');
      console.log('useState');
      console.log('hooks[currentHook]', hooks[currentHook]);
      console.log('');
      hooks[currentHook] = hooks[currentHook] || initialValue; // type: any
      const setStateHookIndex = currentHook; // setState의 클로저를 위해 참조할 값을 선언하여 남겨 두어야 함
      const setState = (newState) => {
        hooks[setStateHookIndex] = newState;
      };
      return [hooks[currentHook++], setState];
    },
    useEffect(callback, depArray) {
      console.log('');
      console.log('useEffect');
      console.log('currentHook', currentHook);
      console.log('hooks[currentHook]', hooks[currentHook]);
      console.log('');
      const hasNoDeps = !depArray;
      const deps = hooks[currentHook]; // type: 초기값: undifined | 한번 갱신 된 이후: 해당 값들이 들어간 의존성 배열 ex) [1, 'foo']
      const hasChangedDeps = deps
        ? !depArray.every((el, i) => el === deps[i])
        : true;
      if (hasNoDeps || hasChangedDeps) {
        callback();
        hooks[currentHook] = depArray;
      }
      currentHook++; // 해당 hook에 대한 작업이 완료
    },
  };
})();

function Counter() {
  const [count, setCount] = MyReact.useState(0);
  const [text, setText] = MyReact.useState('foo');

  MyReact.useEffect(() => {
    console.log('effect', { count: count, text: text });
  }, [count, text]);

  return {
    click: () => setCount(count + 1),
    type: (newText) => setText(newText),
    noop: () => setCount(count),
    render: () => console.log('render:', { count: count, text: text }),
  };
}

let App;
App = MyReact.render(Counter); // effect: { count: 0, text: 'foo' }, render: { count: 0, text: 'foo' }
App.click();
App = MyReact.render(Counter); // effect: { count: 1, text: 'foo' }, render: { count: 1, text: 'foo' }
App.type('bar');
App = MyReact.render(Counter); // effect: { count: 1, text: 'bar' }, render: { count: 1, text: 'bar' }
App.noop();
App = MyReact.render(Counter); // 이팩트 실행 안됨,                    render: { count: 1, text: 'bar' }
App.click();
App = MyReact.render(Counter); // effect: { count: 2, text: 'bar' }, render: { count: 2, text: 'bar' }
