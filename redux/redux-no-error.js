/**
 * @description
 * @export
 * @param {*} reducer 处理函数
 * @param {*} preloadedState 默认值，优先级高于 reducer 中的
 * @param {*} enhancer 中间件
 * @returns {*}
 */
export function createStore(reducer, preloadedState, enhancer) {
  // 如果第二个参数没有传 preloadedState，而是直接传 function
  // 就会直接把这个 function 当成 enhancer
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  // 当第三个参数传了但不是function也会报错
  if (typeof enhancer !== "undefined") {
    return enhancer(createStore)(reducer, preloadedState);
  }

  let currentState = preloadedState; // 优先级高：preloadedState 赋给 currentState
  let currentListeners = []; // 观察者

  // 返回 state
  const getState = () => currentState;

  // 添加观察者
  const subscribe = (listener) => {
    currentListeners.push(listener);
    // 给用户提供一个移除观察者的方法
    return () => {
      currentListeners = currentListeners.filter((l) => l !== listener);
    };
  };

  let isDispatching = false;
  // 改变 state
  const dispatch = (action) => {
    // 防止多次dispatch请求同时改状态
    // 一定是前面的dispatch结束之后，才dispatch下一个
    if (isDispatching) throw new Error();

    try {
      isDispatching = true;
      currentState = reducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    currentListeners.forEach((listener) => listener());
    return action;
  };

  dispatch({ type: "@@mini-redux/custom" });

  return {
    getState,
    subscribe,
    dispatch,
  };
}
