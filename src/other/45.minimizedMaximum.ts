// https://leetcode.cn/problems/minimized-maximum-of-products-distributed-to-any-store/

const isValid = (target: number, nums: number[], mid: number): boolean => {
  let count = 0;
  for (let index = 0; index < nums.length; index++) {
    count += Math.ceil(nums[index] / mid);
  }

  return count <= target;
};
const minimizedMaximum = (target: number, nums: number[]): number => {
  let start = 1;
  let end = 100000;
  let res = 1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (isValid(target, nums, mid)) {
      res = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return res;
};

export {};
