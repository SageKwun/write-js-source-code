// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce(fn, delay) {
  // 定时器
  let timer = null;

  // 将debounce处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let _this = this;
    // 保留调用时传入的参数
    let _arguments = arguments;

    // 每次事件被触发时，都去清除之前的旧定时器
    if (timer) clearTimeout(timer);
    // 设立新定时器
    timer = setTimeout(function () {
      fn.apply(_this, _arguments);
    }, delay);
  };
}
