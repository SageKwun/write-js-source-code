// 用于判断一个值是否为一个普通的对象(普通对象即直接以字面量形式或调用 new Object() 所创建的对象)
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null) return false;

  let proto = obj;
  // 找到最顶层的原型并判断
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

export default isPlainObject;
