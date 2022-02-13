function jsonLoader(source) {
  console.log("json loader: ----------------------");

  this.addDeps("json dep");

  return `export default ${JSON.stringify(source)}`;
}

export { jsonLoader };
