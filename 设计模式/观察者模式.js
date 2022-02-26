class Publisher {
  constructor(state) {
    this.state = state;
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers = this.observers.filter((l) => l !== observer);
  }

  notify() {
    this.observers.forEach((observer) => {
      observer.update(this.state);
    });
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.notify();
  }
}

class Observer {
  constructor() {}

  update(state) {}
}
