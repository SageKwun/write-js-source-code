function pipeFromArray(fns) {
  if (fns.length === 0) return (x) => x;
  if (fns.length === 1) return fns[0];

  // input 是 observable
  return (input) => fns.reduce((prev, fn) => fn(prev), input);
}

// 传入一个 map 函数
// 返回一个生成 observable 对象的函数
function map(project) {
  return (observable) =>
    new Observable((subscriber) => {
      const subscription = observable.subscribe({
        next(value) {
          // value: 接收 pipe 中前一个 operation 的值
          // 传入 project 对 value 做处理，把结果用 next 传下去
          subscriber.next(project(value));
        },
        error(reason) {
          subscriber.error(reason);
        },
        complete() {
          subscriber.complete();
        },
      });
      return subscription;
    });
}

class Subscription {
  constructor() {
    this._teardowns = [];
  }
  unsubscribe() {
    this._teardowns.forEach((teardown) => {
      typeof teardown === "function" ? teardown() : teardown.unsubscribe();
    });
  }
  add(teardown) {
    if (teardown) {
      this._teardowns.push(teardown);
    }
  }
}

class Subscriber extends Subscription {
  constructor(observer) {
    super();
    this.observer = observer;
    this.isStopped = false;
  }
  next(value) {
    if (this.observer.next && !this.isStopped) {
      this.observer.next(value);
    }
  }
  error(value) {
    this.isStopped = true;
    if (this.observer.error) {
      this.observer.error(value);
    }
  }
  complete() {
    this.isStopped = true;
    if (this.observer.complete) {
      this.observer.complete();
    }
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}

// 调用了 new Observable 并不会执行
// _subscribe 里需要调用 observer.next()
// 而 observer 需要用户手动传入（观察者模式）
class Observable {
  constructor(_subscribe) {
    this._subscribe = _subscribe;
  }
  subscribe(observer) {
    const subscriber = new Subscriber(observer);
    // 获取 _subscribe 的返回值（unsubscribe callback）
    // 并添加到 subscriber._teardown
    subscriber.add(this._subscribe(subscriber));
    // 返回供用户调用 subscriber.unsubscribe()
    return subscriber;
  }

  pipe(...operations) {
    return pipeFromArray(operations)(this);
  }
}

// ----- test
const source = new Observable((observer) => {
  let i = 0;
  const timer = setInterval(() => {
    observer.next(++i);
  }, 1000);
  return function unsubscribe() {
    clearInterval(timer);
  };
});
const subscription = source
  .pipe(
    map((i) => ++i),
    map((i) => i * 10)
  )
  .subscribe({
    next: (v) => console.log(v),
    error: (err) => console.error(err),
    complete: () => console.log("complete"),
  });

setTimeout(() => {
  subscription.unsubscribe();
}, 4500);
