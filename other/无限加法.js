// 1. add 为一个函数
// 2. 利用闭包保存sum
let add = (() => {
  let sum = 0;

  return (...args1) => {
    sum += args1.reduce((pre, cur) => pre + cur);
    return sum;
  };
})();

console.log(add(1, 2));
console.log(add(3));
