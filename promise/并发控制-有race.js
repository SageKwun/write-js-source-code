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
 * @description 创建向url发送的请求任务，推入并发池，在请求完成后从并发池删除
 * @param {string} url: 某个任务的url
 */
function addTask(url) {
  let task = request(url);
  pool.push(task);
  task.then((res) => {
    //请求结束后将该Promise任务从并发池中移除
    pool.splice(pool.indexOf(task), 1);
    console.log(`${url} 结束，当前并发数：${pool.length}`);
  });
}

/**
 * @description 当race中有一个请求完成时，推入下一个请求任务
 * @param {Promise} race 请求池的Promise.race
 */
function run(race) {
  race.then((res) => {
    let url = urls.shift();
    if (url !== undefined) {
      addTask(url);
      run(Promise.race(pool));
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
//利用Promise.race方法来获得并发池中某任务完成的信号
let race = Promise.race(pool);
run(race);
