/**
 * reference
 * 1. https://juejin.cn/post/7055217378333818894
 */

// ----------------------------------------------------------------源码
// // 首先创建一个Animal类
// class Animal {
//   name: string;
//   constructor(theName: string) {
//     this.name = theName;
//   }
//   move(distanceInMeters: number = 0) {
//     console.log(`Animal moved ${distanceInMeters}m.`);
//   }
// }

// // 子类Dog继承于Animal
// class Dog extends Animal {
//   age: number;
//   constructor(name: string, age: number) {
//     super(name);
//     this.age = age;
//   }
//   bark() {
//     console.log("Woof! Woof!");
//   }
// }

// const dog = new Dog("wangwang", 12);
// dog.bark(); // 'Woof! Woof!'
// dog.move(10); //`Animal moved 10m.`

// ---------------------------------------------------------------- Babel

// // 第一部分
// var __extends = (this && this.__extends) || (function () {
//     var extendStatics = function (d, b) {
//         extendStatics = Object.setPrototypeOf ||
//             ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
//             function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
//         return extendStatics(d, b);
//     };
//     return function (d, b) {
//         if (typeof b !== "function" && b !== null)
//             throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
//         extendStatics(d, b);
//         function __() { this.constructor = d; }
//         d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
//     };
// })();

// // 第二部分
// // 首先创建一个Animal类
// var Animal = /** @class */ (function () {
//     function Animal(theName) {
//         this.name = theName;
//     }
//     ;
//     Animal.prototype.move = function (distanceInMeters) {
//         if (distanceInMeters === void 0) { distanceInMeters = 0; }
//         console.log("Animal moved ".concat(distanceInMeters, "m."));
//     };
//     return Animal;
// }());

// // 第三部分
// // 子类Dog继承于Animal
// var Dog = /** @class */ (function (_super) {
//     __extends(Dog, _super);
//     function Dog(name, age) {
//         var _this = _super.call(this, name) || this;
//         _this.age = age;
//         return _this;
//     }
//     Dog.prototype.bark = function () {
//         console.log('Woof! Woof!');
//     };
//     Dog.prototype.move = function (distanceInMeters) {
//         if (distanceInMeters === void 0) { distanceInMeters = 5; }
//         console.log("Dog moved ".concat(distanceInMeters, "m."));
//     };
//     return Dog;
// }(Animal));

// // 第四部分 无需解析
// var dog = new Dog('wangwang', 12);
// dog.bark(); // 'Woof! Woof!'
// dog.move(10); // Dog moved 10m.

// ----------------------------------------------------------------手撕，提取核心逻辑，修改变量名
// 第一部分
var __extends = function (subType, superType) {
  if (typeof superType !== "function" && superType !== null)
    throw new TypeError(
      "Class extends value " +
        String(superType) +
        " is not a constructor or null"
    );
  Object.setPrototypeOf(subType, superType); // subType.__proto__ = superType
  function createNewSubPrototype() {
    // 子类新原型构造函数
    this.constructor = subType;
  }
  createNewSubPrototype.prototype = superType.prototype; // 构建子类和新原型的关系
  subType.prototype = new createNewSubPrototype(); // 构建新原型和父原型的关系
};

// 第二部分
// 首先创建一个Animal类
var Animal = (function () {
  function Animal(theName) {
    this.name = theName;
  }
  Animal.prototype.move = function (distanceInMeters) {
    if (distanceInMeters === void 0) {
      distanceInMeters = 0;
    }
    console.log("Animal moved ".concat(distanceInMeters, "m."));
  };
  return Animal;
})();

// 第三部分
// 子类Dog继承于Animal
var Dog = (function (superType) {
  __extends(Dog, superType); // 寄生式改原型，继承父类方法
  function Dog(name, age) {
    var _this = superType.call(this, name) || this; // 盗用构造函数
    _this.age = age;
    return _this;
  }
  Dog.prototype.bark = function () {
    console.log("Woof! Woof!");
  };
  Dog.prototype.move = function (distanceInMeters) {
    if (distanceInMeters === void 0) {
      distanceInMeters = 5;
    }
    console.log("Dog moved ".concat(distanceInMeters, "m."));
  };
  return Dog;
})(Animal);

// 第四部分 无需解析
var dog = new Dog("wangwang", 12);
dog.bark(); // 'Woof! Woof!'
dog.move(10); // Dog moved 10m.
