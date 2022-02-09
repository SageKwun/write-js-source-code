function curry(func) {
  // 返回一个函数
  return function curried(...args) {
    // 如果 原函数参数数量 >= 传入的参数数量
    // 将参数传入原函数
    if (args.length >= func.length) {
      return func.apply(this, args);
      // 如果 原函数参数数量 < 传入的参数数量
      //
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

let curried = curry(sum);
let cur1 = curried(1, 2);
let cur2 = cur1(3);

console.log(cur1);
console.log(cur2);
