// https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/
const reverseLeftWords = (str: string, num: number): string => {
  return `${str.slice(num)}${str.slice(0, num)}`;
};
