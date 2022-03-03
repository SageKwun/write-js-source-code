function myExtends(father, son) {
  const prototype = son.prototype;
  prototype.__proto__ = father.prototype;
  son.__proto__ = father;
}

function father(name) {
  this.name = name;
}

father.prototype.sayName = function () {
  console.log(this.name);
};

function son(name, age) {
  father.apply(this, [name]);
  this.age = age;
}

son.prototype.sayAge = function () {
  console.log(this.age);
};

myExtends(father, son);

let p = new son("name", "age");
console.log(p);
console.log(p instanceof father);
console.log(p instanceof son);
