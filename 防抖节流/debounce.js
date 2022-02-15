// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce(fn, delay) {
  // 定时器
  let timer = null;

  // 将debounce处理结果当作函数返回
  return (...args) => {
    // 每次事件被触发时，都去清除之前的旧定时器
    if (timer) clearTimeout(timer);
    // 设立新定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function debounce(fn, delay, isImmediate) {
  let timer;
  let result;
  return (...args) => {
    if (timer) clearTimeout(timer);
    if (isImmediate) {
      let callNow = !timer;
      setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) result = fn.apply(this, args);
    } else {
      setTimeout(() => {
        result = fn.apply(this, args);
      }, delay);
    }
    return result;
  };
}
