// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce(fn, delay, isImmediate) {
  // 定时器
  let timer;
  let result;
  // 将debounce处理结果当作函数返回
  // 其实就是 clearTimeout 和 res = fn.apply(this, args) 位置互换
  return (...args) => {
    // 立即执行的入口
    if (isImmediate && !timer) {
      result = fn.apply(this, args);
      timer = setTimeout(() => {
        clearTimeout(timer);
        timer = null;
      }, delay);
    } else {
      // 每次事件被触发时，都去清除之前的旧定时器
      clearTimeout(timer);
      // 设立新定时器
      timer = setTimeout(() => {
        result = fn.apply(this, args);
        timer = null;
      }, delay);
    }
    return result;
  };
}
