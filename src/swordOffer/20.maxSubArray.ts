// https://leetcode-cn.com/problems/maximum-subarray/

const maxSubArray = (numArr: number[]): number => {
  if (numArr.length === 1) return numArr[0];
  let result = numArr[0],
    pre = 0;

  numArr.forEach((item) => {
    pre = Math.max(item + pre, pre);
    result = Math.max(result, pre);
  });

  return result;
};

export {};
