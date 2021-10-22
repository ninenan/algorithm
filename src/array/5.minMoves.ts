// https://leetcode-cn.com/problems/minimum-moves-to-equal-array-elements/

// 给你一个长度为 n 的整数数组，每次操作将会使 n - 1 个元素增加 1 。返回让数组所有元素相等的最小操作次数。

/* 输入：nums = [1,2,3]
输出：3
解释：
只需要3次操作（注意每次操作会增加两个元素的值）：
[1,2,3]  =>  [2,3,3]  =>  [3,4,3]  =>  [4,4,4] */

/* 输入：nums = [1,1,1]
输出：0 */

const minMoves = (numArr: number[]): number => {
  const minNum = Math.min(...numArr);
  let result = 0;
  for (const item of numArr) {
    result += item - minNum;
  }

  return result;
};

console.log(minMoves([1, 2, 3])); // 3
console.log(minMoves([1, 1, 1])); // 0
