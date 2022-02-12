import fs from "fs";
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";

function createAssert() {
  // 获取内容
  const source = fs.readFileSync("./example/main.js", { encoding: "utf8" });
  // console.log("source: " + source);

  // 获取AST
  const ast = parser.parse(source, { sourceType: "module" });
  // console.log("ast: ", ast);
  const deps = [];

  // ⚠️这里调用 **.default**
  traverse.default(ast, {
    ImportDeclaration({ node }) {
      // console.log("node: ", node);
      deps.push(node.source.value);
    },
  });
  // console.log("deps: ", deps);

  return {
    source,
    deps,
  };
}

createAssert();
