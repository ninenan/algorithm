// https://leetcode-cn.com/problems/maximum-subarray/

// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

/* 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。 */

/* 输入：nums = [1]
输出：1 */

/* 输入：nums = [0]
输出：0 */

/* 输入：nums = [-1]
输出：-1 */

/* 输入：nums = [-100000]
输出：-100000 */

const maxSubArray = (numArr: number[]): number => {
  let result = numArr[0],
    pre = 0;

  numArr.forEach((item) => {
    pre = Math.max(item + pre, item);
    result = Math.max(result, pre);
  });

  return result;
};

/* var maxSubArray = function(nums) {
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};
 */
