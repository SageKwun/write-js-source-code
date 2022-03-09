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

function fn(requestFn = () => {}, max = 3, urls = []) {
  const pool = []; //并发池
  urls = urls.slice(); // 克隆一份，避免影响原数组

  //先循环把并发池塞满
  for (let i = 0; i < max; i++) {
    run();
  }

  function run() {
    if (urls.length <= 0) return;
    const url = urls.shift();
    const task = requestFn(url);

    pool.push(task);

    task.then(() => {
      console.log(`${url}完成，当前并发数 ${pool.length}`);
      // 请求结束后将该Promise任务从并发池中移除
      pool.splice(pool.indexOf(task), 1);
      // 每当并发池跑完一个任务，就再塞入一个任务
      run();
    });
  }
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

fn(request, 3, urls);
