// https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/

const getLeastNumbers = (arr: number[], k: number): number[] => {
  return arr.sort((a, b) => a - b).splice(0, k);
};
