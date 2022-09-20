const sleep = (timer: number) => new Promise((resolve) => setTimeout(resolve, timer));

function promiseLimit(fns = [], maxNum: number): Promise<any> {
  // 请求总数量
  const len = fns.length;
  // 根据请求数量创建一个数组来保存请求的结果
  const result = new Array(len).fill(false);
  // 当前完成的数量
  let count = 0;

  return new Promise((resolve, reject) => {
    // 请求maxNum个
    while (count < maxNum) {
      next();
    }
    async function next() {
      let current = count++;
      // 处理边界条件
      if (current >= len) {
        // 请求全部完成就将promise置为成功状态, 然后将result作为promise值返回
        !result.includes(false) && resolve(result);
        return;
      }

      const fn = fns[current];
      console.log(`开始 ${current}`, new Date().toLocaleString());

      const res = await Promise.resolve(fn)

      result[current] = res;
      console.log('res: ', res);
      if (current < len) {
        next()
      }
    }
  });
}

const fn = (timer: number):Promise<any> => sleep(timer).then(() => {
  return Promise.resolve(timer)
  console.log(222)
});

const testFn = () => 444

const fns = [fn(1000), fn(2000), fn(3000), fn(1000), testFn(), fn(4000)];

promiseLimit(fns, 2).then(res => {
  console.log('res: ', res);
})
