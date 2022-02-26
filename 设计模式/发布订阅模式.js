class EventEmitter {
  constructor() {
    // map表：eventName - handlers
    this.handlers = new Map();
  }

  // 订阅
  on(eventName, callback) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }

    this.handlers.get(eventName).push(callback);
  }

  // 发布
  emit(eventName, ...args) {
    if (this.handlers.has(eventName)) {
      // 这里需要对 this.handlers[eventName] 做一次浅拷贝
      // 主要目的是为了避免通过 once 安装的监听器在移除的过程中出现顺序问题
      const callbacks = this.handlers.get(eventName).slice();
      callbacks.forEach((callback) => {
        callback(...args);
      });
    }
  }

  // 移除
  off(eventName, callback) {
    const callbacks = this.handlers.get(eventName);
    let index = callbacks.indexOf(callback);
    if (index !== -1) callbacks.splice(index, 1);
  }

  // 单次
  once(eventName, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }
}
