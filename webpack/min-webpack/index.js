import fs from "fs";
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import path, { relative } from "path";
import ejs from "ejs";

function createAssert(filePath) {
  // 获取内容
  const source = fs.readFileSync(filePath, { encoding: "utf8" });
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
    filePath,
  };
}

/**
 * @description 广度优先遍历依赖
 * @param {string} filePath
 * @returns {Array}
 */
function createGraph(filePath) {
  const mainAssert = createAssert(filePath);
  const queue = [mainAssert];
  map.set(filePath, mainAssert);

  for (const asset of queue) {
    asset.deps.forEach((relativePath) => {
      const childPath = path.resolve("./example", relativePath);
      if (queue.includes(childPath)) return;
      const child = createAssert(childPath);
      queue.push(child);
    });
  }
  return queue;
}

const graph = createGraph("./example/main.js");
console.log(graph);
