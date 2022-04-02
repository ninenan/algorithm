// https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/

const minArray = (nums: number[]): number => {
  return nums.sort((a, b) => a - b)[0];
};
