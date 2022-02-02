const http = require("http");

const server = http.createServer();

// server.on("request", (req, res) => {
//   if (req.url === "/") {
//     res.setHeader("Content-Type", "text/html; charset=utf8");
//     res.setHeader("Content-Length", 10);
//     res.setHeader("Transfer-Encoding", "chunked");
//     res.write("<p>来啦</p>");
//     setTimeout(() => {
//       res.write("第一次传输<br/>");
//     }, 1000);
//     setTimeout(() => {
//       res.write("第二次传输");
//       res.end();
//     }, 2000);
//   }
// });
const URL = "http://localhost:8010/";

server.on("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Expose-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Max-Age", 10);

  console.log(req.headers["content-type"]);

  res.write("end");
  res.end();
});

server.listen(8010, () => {
  console.log("成功启动");
});
