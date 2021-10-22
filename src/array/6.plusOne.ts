// https://leetcode-cn.com/problems/plus-one/

/* 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
你可以假设除了整数 0 之外，这个整数不会以零开头。*/

/* 输入：digits = [1,2,3]
输出：[1,2,4]
解释：输入数组表示数字 123。 */

/* 输入：digits = [4,3,2,1]
输出：[4,3,2,2]
解释：输入数组表示数字 4321。 */

/* 输入：digits = [0]
输出：[1] */

const plusOne = (numArr: number[]): number[] => {
  for (let index = numArr.length - 1; index >= 0; index--) {
    numArr[index]++;
    numArr[index] %= 10;
    if (numArr[index] !== 0) {
      break;
    }
  }
  if (numArr.every((num) => num === 0)) {
    numArr.unshift(1);
  }

  return numArr;
};
