// 创建一个空的简单 JavaScript 对象（即 {} ）；
// 为步骤1新创建的对象添加属性 __proto__ ，将该属性链接至构造函数的原型对象 ；
// 将步骤1新创建的对象作为 this 的上下文 ；
// 如果该函数没有返回对象，则返回 this 。

// ES6: function createObject(constructor, ...args) {
function createObject(constructor) {
  // 创建新对象obj
  var obj = {};

  // 将obj.__proto__ -> 构造函数原型
  // ES6: Object.setPrototypeOf(obj, constructor.prototype);
  obj.__proto__ = constructor.prototype;

  // 执行构造函数，并接受构造函数返回值
  // ES6: constructor.apply(obj, args);
  var result = constructor.apply(obj, [].slice.call(arguments, 1));

  // 若构造函数返回值为对象，直接返回该对象
  // 否则返回obj
  if (
    (typeof result === "object" && result !== null) ||
    typeof result === "function"
  ) {
    return result;
  }

  return obj;
}

function P(name) {
  this.name = name;
}

let p = createObject(P, "ppp");

console.log(p instanceof P);
