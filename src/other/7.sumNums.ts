// https://leetcode-cn.com/problems/qiu-12n-lcof/solution/

// 求 1+2+...+n ，要求不能使用乘除法、for、while、if、else、switch、case等关键字及条件判断语句（A?B:C）。

/* 输入: n = 3
输出: 6 */

/* 输入: n = 9
输出: 45 */

const sumNums = (num: number): number => {
  if (num) {
    num += sumNums(num - 1);
  }
  return num;
};
