// https://leetcode.cn/problems/minimum-value-to-get-positive-step-by-step-sum/

const minStartValue = (nums: number[]): number => {
  let res = 0;
  let minSun = 0;

  for (let index = 0; index < nums.length; index++) {
    res += nums[index];
    minSun = Math.min(res, minSun)
  }

  return -minSun + 1;
}

export {};
