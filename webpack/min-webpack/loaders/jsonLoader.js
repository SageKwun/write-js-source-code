function jsonLoader(source) {
  console.log("json loader: ----------------------");

  return `export default ${JSON.stringify(source)}`;
}

export { jsonLoader };
