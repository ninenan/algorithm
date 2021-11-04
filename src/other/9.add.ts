// https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/

// 写一个函数，求两个整数之和，要求在函数体内不得使用 “+”、“-”、“*”、“/” 四则运算符号。

/* 输入: a = 1, b = 1
输出: 2 */

const add = (a: number, b: number): number => {
  while (b) {
    // 进位
    const c = (a & b) << 1;
    // 不考虑进位的加法
    a ^= b;
    // 将进位赋值给b
    b = c;
  }
  return a;
};
