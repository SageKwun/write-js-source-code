//自定义请求函数
var request = (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`任务${url}完成`);
    }, 1000);
  }).then((res) => {
    console.log("外部逻辑", res);
  });
};

/**
 * @description 创建向url发送的请求任务，推入并发池，在请求完成后从并发池删除并推入新的请求任务
 * @param {string} url: 某个任务的url
 */
function addTask(url) {
  let task = request(url);
  pool.push(task);
  task.then((res) => {
    //请求结束后将该Promise任务从并发池中移除
    pool.splice(pool.indexOf(task), 1);
    console.log(`${url} 结束，当前并发数：${pool.length}`);
    url = urls.shift();
    //每当并发池跑完一个任务，就再塞入一个任务
    if (url !== undefined) {
      addTask(url);
    }
  });
}

let urls = [
  "bytedance.com",
  "tencent.com",
  "alibaba.com",
  "microsoft.com",
  "apple.com",
  "hulu.com",
  "amazon.com",
]; // 请求地址
let pool = []; //并发池
let max = 3; //最大并发量
//先循环把并发池塞满
while (pool.length < max) {
  let url = urls.shift();
  addTask(url);
}
