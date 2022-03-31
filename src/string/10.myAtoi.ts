// https://leetcode-cn.com/problems/string-to-integer-atoi/

const myAtoi = (str: string): number => {
  // 正则
  const RE = /\s*([-/+]?[0-9]*).*/;
  // 获取捕获组
  const groups = str.match(RE);
  // 设置最大值
  const max = Math.pow(2, 31) - 1;
  // 设置最小值
  const min = -max - 1;
  let result = 0;
  if (groups) {
    result = +groups[1];
    // 如果是 NaN 的话 则设置为 0
    if (isNaN(result)) result = 0;
  }
  // 判断结果是否大于最大值
  if (result > max) return max;
  // 判断结果是否小于最小值
  if (result < min) return min;
  return result;
};
