// 先定义三个常量表示状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;

      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(this.value);
      }
    }
  };

  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;

      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(this.reason);
      }
    }
  };

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            this.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.status === FULFILLED) {
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });

    return promise2;
  }

  resolvePromise(promise, x, resolve, reject) {
    if (promise === x) return reject(new TypeError());

    if (typeof x === "object" || typeof x === "function") {
      if (x === null) return resolve(x);

      let then;
      try {
        then = x.then;
      } catch (error) {
        return reject(error);
      }

      if (typeof then === "function") {
        let called = false;
        try {
          then.call(
            x,
            (v) => {
              if (called) return;
              called = true;
              this.resolvePromise(promise, v, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } catch (error) {
          if (called) return;
          reject(error);
        }
      } else {
        resolve(x);
      }
    } else {
      resolve(x);
    }
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value;

    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static catch(onRejected) {
    this.then(undefined, onRejected);
  }

  static finally(fn) {
    return this.then(
      (v) => MyPromise.resolve(fn()).then(() => value),
      (r) =>
        MyPromise.resolve(fn()).then(() => {
          throw error;
        })
    );
  }

  static race(promiseList) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promiseList)) return reject(promiseList);
      const length = promiseList.length;
      if (length === 0) return resolve(promiseList);

      promiseList.forEach((promise) => promise.then(resolve, reject));
    });
  }

  static all(promiseList) {
    return new MyPromise((resolve, reject) => {
      if (!Array.isArray(promiseList)) return reject(new Error());
      const length = promiseList.length;
      if (length === 0) return resolve(promiseList);

      let count = 0;
      const res = new Array(length);

      promiseList.forEach((promise, index) => {
        promise.then((v) => {
          res[index] = v;
          count++;
          if (count === length) return resolve(res);
        }, reject);
      });
    });
  }
}

debugger;
new MyPromise((resolve, reject) => {
  console.log("外部promise");
  resolve();
})
  .then(() => {
    console.log("外部第一个then");
    new MyPromise((resolve, reject) => {
      console.log("内部promise");
      debugger;
      resolve();
    })
      .then(() => {
        console.log("内部第一个then");
        return MyPromise.resolve();
      })
      .then(() => {
        console.log("内部第二个then");
      });
  })
  .then(() => {
    console.log("外部第二个then");
  })
  .then(() => {
    console.log("外部第三个then");
  })
  .then(() => {
    console.log("外部第四个then");
  });
