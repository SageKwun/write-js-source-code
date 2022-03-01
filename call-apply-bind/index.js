/**
 * @reference https://juejin.cn/post/6844903891092389901
 * @reference https://juejin.cn/post/7063385389234421791
 */

// call
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  args = args ?? [];

  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
};

// apply
Function.prototype.myApply = function (context, args) {
  //这里默认不传就是给window,也可以用es6给参数设置默认参数
  context = context || window;
  args = args ?? [];
  //给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol();
  context[key] = this;
  //通过隐式绑定的方式调用函数
  const result = context[key](...args);
  //删除添加的属性
  delete context[key];
  //返回函数调用的返回值
  return result;
};

// bind
// 原生 bind 函数还有一个用法：作为构造函数使用的绑定函数。对此，简单来说就是：
// 一个调用了 bind 之后返回的函数，也能使用 new 操作符创建对象：这种行为就像把原函数当成构造器。
// 这样做的话，原本绑定传入的 context 参数会被忽略，但传入的参数依然生效。

Function.prototype.myBind = function (context, ...args) {
  // 调用者必须是一个函数
  if (typeof this !== "function")
    throw new Error(`${this}.bind is not a function`);

  // 获取原函数
  const fn = this;
  // 返回的函数
  const newFn = function (...newArgs) {
    // 判断是否作为构造函数使用的绑定函数
    return fn.apply(this instanceof newFn ? this : context, [
      ...args,
      ...newArgs,
    ]);
  };

  // 继承关系
  if (fn.prototype) newFn.prototype = Object.create(fn.prototype);

  return newFn;
};

// ---------------------myApply test----------------------------
// function foo(a) {
//   this.a = a;
//   console.log(this.a);
// }

// const b = {
//   a: "b",
// };

// foo.myApply(b, ["c"]);

// ---------------------my test----------------------------

let foo = {
  value: 1,
};

function bar(name) {
  this.habit = "eating";
  console.log(this.value);
  console.log(name);
}

bar.prototype.testFn = function () {
  console.log("yes!");
};

let bindFoo = bar.myBind(foo);
let obj = new bindFoo("John");
// undefined
// John
console.log(obj.habit); // eating

console.log(obj instanceof bindFoo); // true
console.log(obj instanceof bar); // false
obj.testFn(); // obj.testFn is not a function
