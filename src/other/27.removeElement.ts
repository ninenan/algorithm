// https://leetcode.cn/problems/remove-element/

const removeElement = (nums: number[], val: number): number => {
  if (!nums.length) {
    return 0;
  }

  for (let index = 0; index < nums.length; index++) {
    if (nums[index] === val) {
      nums.splice(index, 1);
      index --;
    }
  }

  return nums.length;
}

const removeElement2 = (nums: number[], val: number): number => {
  const len = nums.length;

  if (!len) {
    return 0;
  }

  let start = 0;

  for (let index = 0; index < len; index++) {
    if (nums[index] !== val) {
      nums[start] = nums[index];
      start++;
    }
  }

  return start;
}
