// https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/

const findRepeatNumber = (nums: number[]): number => {
  const cache = new Map<number, number>();
  nums.sort((a, b) => a - b);

  for (let index = 0; index < nums.length; index++) {
    if (cache.has(nums[index])) {
      return cache.get(nums[index]);
    }
    cache.set(nums[index], nums[index]);
  }
};

console.log(findRepeatNumber([2, 3, 1, 0, 5, 3]));
