// https://juejin.cn/book/6844733800300150797/section/6844733800371453965

const knapsack = (
  n: number,
  c: number,
  w: number[],
  value: number[]
): number => {
  const dp = new Array(c + 1).fill(0);
  let res = -Infinity;

  for (let index = 1; index <= n; index++) {
    for (let v = c; v >= w[index]; v--) {
      dp[v] = Math.max(dp[v], dp[v - w[index]] + value[index]);

      if (dp[v] > res) {
        res = dp[v];
      }
    }
  }

  return res;
};

console.log(knapsack(5, 100, [22, 24, 42, 16, 7], [1, 2, 3, 4, 5]));