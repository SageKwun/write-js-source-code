// version 1 --------------------------------------------------------------------------
// 仅使用包裹函数建立各个模块的命名空间
// 还需要解决导入导出的转换
// function modules() {
//   function foojs() {
//     function foo() {
//       console.log("foo");
//     }

//     export { foo };
//   }

//   function mainjs() {
//     import { foo } from "./foo.js";

//     foo();
//     console.log("finished");
//   }

//   mainjs();
// }

// version 2 --------------------------------------------------------------------------
// 将导入导出转为commonjs
// function modules() {
//   // 设计一个自定义的require函数
//   // 通过filePath找到对应的模块
//   function require(filePath) {
//     const map = {
//       "./foo.js": foojs,
//       "./main.js": mainjs,
//     };
//     const fn = map[filePath];
//     return fn();
//   }

//   function foojs() {
//     function foo() {
//       console.log("foo");
//     }
//     // export { foo };
//     module.exports = { foo };
//   }

//   function mainjs() {
//     // import { foo } from "./foo.js";
//     const { foo } = require("./foo.js");

//     foo();
//     console.log("finished");
//   }

//   require("./main.js");
// }

// modules();

// version 3 --------------------------------------------------------------------------
// 实现自定义的require
// function modules() {
//   // 设计一个自定义的require函数
//   // 通过filePath找到对应的模块
//   function require(filePath) {
//     const map = {
//       "./foo.js": foojs,
//       "./main.js": mainjs,
//     };
//     const fn = map[filePath];
//     const module = {
//       exports: {},
//     };
//     fn(require, module, module.exports);
//     return module.exports;
//   }

//   function foojs(require, module, exports) {
//     function foo() {
//       console.log("foo");
//     }
//     // export { foo };
//     module.exports = { foo };
//   }

//   function mainjs(require, module, exports) {
//     // import { foo } from "./foo.js";
//     const { foo } = require("./foo.js");

//     foo();
//     console.log("finished");
//   }

//   require("./main.js");
// }

// modules();

// version 4 -----------
// 重构格式为立即执行函数
(function (modules) {
  // 设计一个自定义的require函数
  // 通过filePath找到对应的模块
  function require(filePath) {
    const fn = modules[filePath];
    const module = {
      exports: {},
    };
    fn(require, module, module.exports);
    return module.exports;
  }

  require("./main.js");
})({
  "./foo.js": function (require, module, exports) {
    function foo() {
      console.log("foo");
    }
    // export { foo };
    module.exports = { foo };
  },
  "./main.js": function (require, module, exports) {
    // import { foo } from "./foo.js";
    const { foo } = require("./foo.js");

    foo();
    console.log("finished");
  },
});
