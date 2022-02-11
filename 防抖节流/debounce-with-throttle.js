// fn是我们需要包装的事件回调, delay是时间间隔的阈值
function debounceWithThrottle(fn, delay) {
  // last为上一次触发回调的时间, timer是定时器
  let last = 0;
  let timer = null;
  // 将throttle处理结果当作函数返回

  return function () {
    // 保留调用时的this上下文
    let context = this;
    // 保留调用时传入的参数
    let args = arguments;
    // 记录本次触发回调的时间
    let now = +new Date();

    if (now - last >= delay) {
      // 如果时间间隔超出了我们设定的时间间隔阈值，那就不等了，无论如何要反馈给用户一次响应
      last = now;
      fn.apply(context, args);
    } else {
      // 如果时间间隔小于我们设定的时间间隔阈值，则为本次触发操作设立一个新的定时器
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        last = now; // 更新last，防止最后的时候多发送一起请求
        fn.apply(context, args);
      }, delay);
    }
  };
}
