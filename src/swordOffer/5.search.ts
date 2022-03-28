// https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/

const search = (nums: number[], target: number): number => {
  let start = 0;
  let end = nums.length - 1;
  let count = 0;

  while (start <= end) {
    while (start <= end && nums[start] !== target) {
      start++;
    }
    while (start <= end && nums[end] !== target) {
      end--;
    }
    if (start <= end) {
      count = end - start + 1;
      return count;
    }
  }

  return count;
};
