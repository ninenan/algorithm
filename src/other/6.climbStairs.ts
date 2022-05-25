// https://leetcode-cn.com/problems/climbing-stairs/

/* 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
注意：给定 n 是一个正整数。 */

/* 输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶 */

/* 输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶 */

/* 1: 1
2: 2
3: f(1) + f(2)
4: f(3) + f(2)
 */

const climbStairs = (n: number): number => {
  if (n <= 2) {
    return n;
  }
  let p = 0,
    q = 0,
    r = 1;
  for (let index = 0; index < n; index++) {
    p = q;
    q = r;
    r = p + q;
  }

  return r;
};

const climbStairs2 = (n: number): number => {
  if (n <= 2) return n
  const f = []
  f[1] = 1
  f[2] = 2

  for (let index = 3; index <= n; index++) {
    f[index] = f[index - 2] + f[index - 1]
  }

  return f[n]
}

// 会爆栈 多了很多重复的计算
const climbStairs3 = (n: number): number => {
  if (n <= 2) return n

  return climbStairs3(n - 1) + climbStairs3(n - 2)
}

// 对 climbStairs3 的优化
const climbStairs4 = (n: number): number => {
  // 使用 fns 对已经计算过的做了缓存
  const fns: number[] = []
  const add = (n: number) => {
      if (n <= 2) return n

      if (!fns[n]) fns[n] = add(n - 1) + add(n - 2)

      return fns[n]
  }    

  return add(n)
}

export {}