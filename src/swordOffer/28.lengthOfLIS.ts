// 题目描述：给定一个无序的整数数组，找到其中最长上升子序列的长度。
// 示例:
// 输入: [10,9,2,5,3,7,101,18]
// 输出: 4
// 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
// 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。 你算法的时间复杂度应该为 O(n^2) 。
// 进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?

const lengthOfLIS = (nums: number[]): number => {
  const len = nums.length;

  if (!len) {
    return 0
  }

  const dp = (new Array(len)).fill(1);
  let maxLen = 1;

  for (let index = 1; index < len; index++) {
    for (let j = 0; j < index; j++) {
      if (nums[j] < nums[index]) {
        dp[index] = Math.max(dp[index], dp[j] + 1)
      }
    }
    if (dp[index] > maxLen) {
      maxLen = dp[index];
    }
  }

  return maxLen;
}
