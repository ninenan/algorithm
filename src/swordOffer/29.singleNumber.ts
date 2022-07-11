// https://leetcode.cn/problems/WGki4K/

// 为满足题目要求
const singleNumber = (nums: number[]): number => {
  if (!nums.length) {
    return 0;
  }

  let map = new Map<number, number>();
  let len = nums.length;
  let res: number = 0;

  for (let index = 0; index < len; index++) {
    if (map.get(nums[index])) {
      map.set(nums[index], (map.get(nums[index]) as number) + 1);
    } else {
      map.set(nums[index], 1)
    }
  }

  for (const [key, value] of map.entries()) {
    if (value === 1) {
      res = key;
      break;
    }
  }

  return res;
}
