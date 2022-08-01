// https://leetcode.cn/problems/remove-duplicates-from-sorted-array/solution/

const removeDuplicates = (nums: number[]): number => {
  const len = nums.length;
  
  if (!len) {
    return 0;
  }

  let fast = 1;
  let slow = 1;

  while (fast < len) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast]
      ++slow;
    }
    ++ fast;
  }

  return slow;
}
