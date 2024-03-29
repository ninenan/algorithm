// https://leetcode-cn.com/problems/palindrome-number/

/* 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。例如，121 是回文，而 123 不是 */

/* 输入：x = 121
输出：true */

/* 输入：x = -121
输出：false
解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。 */

/* 输入：x = 10
输出：false
解释：从右向左读, 为 01 。因此它不是一个回文数。 */

/* 输入：x = -101
输出：false */

const isPalindrome = (num: number): boolean => {
  if (num < 0) {
    return false;
  }

  let result = true,
    strNum = num + "",
    start = 0,
    end = strNum.length - 1;

  while (start < end) {
    if (strNum[start] !== strNum[end]) {
      result = false;
      return result;
    }
    start++;
    end--;
  }

  return result;
};

const isPalindrome2 = (num: number): boolean => {
  if (num < 0) return false;
  if (num < 10) return true;

  const str = num + "";
  const len = str.length;

  for (let index = 0; index < len / 2; index++) {
    if (str[index] !== str[len - index - 1]) {
      return false;
    }
  }

  return true;
};
