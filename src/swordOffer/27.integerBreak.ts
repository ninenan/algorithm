// https://leetcode.cn/problems/jian-sheng-zi-lcof/submissions/
const integerBreak = (n: number): number => {
  let dp = new Array(n + 1).fill(0)
  dp[2] = 1
  
  for (let index = 3; index <= n; index++) {
    for (let j = 1; j < index; j++) {
      dp[index] = Math.max(dp[index], dp[index - j] * j, (index - j) * j)
    }
  }

  return dp[n]
}


const integerBreak2 = (n: number): number => {
  if (n < 4) {
    return n - 1;
  }

  let dp = new Array(n + 1).fill(0)
  dp[2] = 1;

  for (let i = 3; i <= n; i++) {
    dp[i] = Math.max(Math.max(2 * (i - 2), 2 * dp[i - 2]), Math.max(3 * (i - 3), 3 * dp[i - 3]));
  }

  return dp[n];
}