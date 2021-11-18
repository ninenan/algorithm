// https://leetcode-cn.com/problems/powx-n/
// 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。

/* 输入：x = 2.00000, n = 10
输出：1024.00000 */

/* 输入：x = 2.10000, n = 3
输出：9.26100 */

/* 输入：x = 2.00000, n = -2
输出：0.25000
解释：2-2 = 1/22 = 1/4 = 0.25 */

// 超出时间限制
/* const myPow = (x: number, n: number): number => {
  let res = 1;
  if (n < 0) {
    n = Math.abs(n);
    for (let index = 0; index < n; index++) {
      res /= x;
    }
  } else {
    for (let index = 0; index < n; index++) {
      res *= x;
    }
  }
  return res;
}; */

// 非递归 ✨✨✨✨✨
/* const myPow = (x: number, n: number): number => {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  if (n === 0) {
    return 1;
  }
  let res = 1;
  while (n > 1) {
    if (n & 1) {
      n--;
      res *= x;
    }
    x *= x;
    n /= 2;
  }

  return res * x;
}; */

// 递归
const myPow = (x: number, n: number): number => {
  if (n < 0) {
    return 1 / myPow(x, -n);
  }
  // 递归出口
  if (n === 0) {
    return 1;
  }
  // 奇数
  if (n % 2) {
    return x * myPow(x, n - 1);
  }
  // 偶数
  return myPow(x * x, n / 2);
};
