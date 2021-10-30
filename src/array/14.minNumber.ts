// https://leetcode-cn.com/problems/ba-shu-zu-pai-cheng-zui-xiao-de-shu-lcof/

// 输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

/* 输入: [10,2]
输出: "102" */

/* 输入: [3,30,34,5,9]
输出: "3033459" */

const minNumber = (numArr: number[]): string => {
  return numArr.sort((a, b) => +`${a}${b}` - +`${b}${a}`).join("");
};

console.log(minNumber([10, 2]));
console.log(minNumber([3, 30, 34, 5, 9]));
