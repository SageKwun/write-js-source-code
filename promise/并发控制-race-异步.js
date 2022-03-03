/**
 * @param {function} request 请求方法
 * @param {number} max 最大并发数
 * @param {string[]} urls 请求url队列
 */
async function fn(requestFn = () => {}, max = 3, urls = []) {
  if (typeof requestFn !== "function")
    throw new Error("requestFn should be a function");
  if (typeof max !== "number") throw new Error("max should be a number");
  if (!Array.isArray(urls)) throw new Error("urls should be an Array");

  if (urls.length === 0 || max === 0) return [];

  const result = new Array(urls.length);
  let sign;

  let pool = []; //并发池
  for (let i = 0; i < urls.length; i++) {
    let url = urls[i];
    let task = request(url);
    task.then((value) => {
      //每当并发池跑完一个任务,从并发池删除个任务
      pool.splice(pool.indexOf(task), 1);
      result[i] = value;
      console.log(`${url} 结束，当前并发数：${pool.length}`);
    });
    pool.push(task);
    if (pool.length === max) {
      //利用Promise.race方法来获得并发池中某任务完成的信号
      //跟await结合当有任务完成才让程序继续执行,让循环把并发池塞满
      await Promise.race(pool);
    }
    // 把 sign 放在外面，避免没到达 max 的情况
    sign = Promise.all(pool);
  }

  return sign.then(() => result);
}

// test
//自定义请求函数
function request(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`任务${url}完成`);
    }, 1000);
  }).then((res) => {
    console.log("外部逻辑", res);
    return url;
  });
}

let urls = [
  // "bytedance.com",
  // "tencent.com",
  // "alibaba.com",
  // "microsoft.com",
  // "apple.com",
  // "hulu.com",
  // "amazon.com",
]; // 请求地址

(async () => {
  console.log(await fn(request, 3, urls));
})();
