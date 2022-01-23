function Prom(executor) {
  let self = this;

  self.status = "pending";
  self.data = undefined;
  self.callbacks = [];

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }

  function resolve(val) {
    if (self.status !== "pending") return;

    console.log("into resolve");

    self.status = "resolved";
    self.data = val;
    setTimeout(() => {
      self.callbacks.forEach((callbackObj) => callbackObj.onResolved(val));
    }, 0);
  }

  function reject(reason) {
    if (self.status !== "pending") return;

    console.log("into reject");

    self.status = "rejected";
    self.data = reason;
    setTimeout(() => {
      self.callbacks.forEach((callbackObj) =>
        callbackObj.onRejected(self.data)
      );
    }, 0);
  }
}

Prom.prototype.then = function (onResolved, onRejected) {
  this.callbacks.push({ onResolved, onRejected });
};

const p = new Prom((resolve, reject) => {
  setTimeout(() => {
    console.log("into executor");
    reject(1);
  }, 1000);
});
p.then(
  (value) => {
    console.log("onResolved1", value);
  },
  (reason) => {
    console.log("onRejected1", reason);
  }
);
