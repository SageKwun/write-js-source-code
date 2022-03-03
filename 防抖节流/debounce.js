// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce(fn, delay, isImmediate) {
  // 定时器
  let timer;
  let result;
  // 将debounce处理结果当作函数返回
  return (...args) => {
    // 立即执行的入口
    if (isImmediate) {
      // 判断是否需要立即执行
      let callNow = !timer;
      // 一段时间后清除标记，重置立即执行判断
      setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) result = fn.apply(this, args);
    } else {
      // 每次事件被触发时，都去清除之前的旧定时器
      if (timer) clearTimeout(timer);
      // 设立新定时器
      timer = setTimeout(() => {
        result = fn.apply(this, args);
      }, delay);
    }
    return result;
  };
}
