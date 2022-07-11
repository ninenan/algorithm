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
