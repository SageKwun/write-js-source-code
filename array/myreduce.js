Array.prototype.myReduce = function myReduce(reducer, initialValue) {
  if (typeof reducer !== "function") {
    throw new Error();
  }

  var len = this.length;
  // 有初始值，start = 0，pre为初始值
  var start = 0;
  var pre = initialValue;

  if (initialValue === undefined) {
    if (len === 0) {
      throw new Error();
    }
    // 没初始值，start = 1，pre为第一个元素的值
    start = 1;
    pre = this[0];
  }

  for (var i = start; i < len; i++) {
    pre = reducer.call(this, pre, this[i], this, i);
  }

  return pre;
};

// --------------------test--------------------------------------
// ...
// 1. 数组不为空，没有初始值
const nums = [1, 2, 3];
const sum1 = nums.myReduce((pre, cur) => pre + cur);
console.log(sum1);
// -> 6

// 2. 数组不为空，有初始值
const sum2 = nums.myReduce((pre, cur) => pre + cur, -1);
console.log(sum2);
// -> 5

// 3. 数组为空，有初始值
const emptyArr = [];
const result = emptyArr.myReduce((pre, cur) => pre + cur, -1);
console.log(result);
// -> -1

// 4. 数组为空，没有初始值
// const foo = emptyArr.myReduce((pre, cur) => pre + cur);
// -> TypeError: Reduce of empty array with no initial value

// 5. reducer 为非函数
// const foo2 = nums.myReduce('');
// -> TypeError: reducer is not a function
