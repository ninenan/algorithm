// https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof/

/* 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。 */

/* 输入：n = 2
输出：2 */

/* 输入：n = 7
输出：21 */

/* 输入：n = 0
输出：1 */

const numWays = (num: number): number => {
  const MOD = 1000000007;
  let sum = 0,
    x = 1,
    y = 1;
  for (let index = 0; index < num; index++) {
    sum = (x + y) % MOD;
    x = y;
    y = sum;
  }

  return x;
};
