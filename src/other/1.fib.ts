// https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/

// 写一个函数，输入 n ，求斐波那契（Fibonacci）数列的第 n 项（即 F(N)）。斐波那契数列的定义如下：

/* F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。
答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。*/

/* 输入：n = 2
输出：1 */

/* 输入：n = 5
输出：5 */

const fib = (num: number): number => {
  const MOD = 1000000007;
  if (num < 2) {
    return num;
  }
  let p = 0,
    q = 0,
    result = 1;

  for (let index = 2; index <= num; index++) {
    p = q;
    q = result;
    result = (q + p) % MOD;
  }

  return result;
};
