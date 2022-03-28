// https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/submissions/

const missingNumber = (nums: number[]): number => {
  let result = 0;

  if (nums[0] !== 0) {
    return result;
  }

  for (let index = 0; index < nums.length; index++) {
    const current = nums[index];
    const next = nums[index + 1];
    if (current + 1 !== next) {
      result = current + 1;
      return result;
    }
  }
  return result;
};

export {};
