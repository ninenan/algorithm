// https://leetcode-cn.com/problems/zui-chang-bu-han-zhong-fu-zi-fu-de-zi-zi-fu-chuan-lcof/

// 请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

/* 输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。 */

/* 输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。 */

/* 输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。 */

/* const lengthOfLongestSubstring = (str: string): number => {
  let result = 0,
    cacheKey = -1,
    cacheSet = new Set();
  if (str.length === 1) {
    return 1;
  }

  for (let index = 0; index < str.length; index++) {
    if (index !== 0) {
      cacheSet.delete(str.charAt(index - 1));
    }
    while (
      cacheKey + 1 < str.length &&
      !cacheSet.has(str.charAt(cacheKey + 1))
    ) {
      cacheSet.add(str.charAt(cacheKey + 1));
      ++cacheKey;
    }

    result = Math.max(result, cacheKey - index + 1);
  }

  return result;
}; */

const lengthOfLongestSubstring = (s: string) => {
  let str: string[] = [],
    maxLength = 0;
  for (let index = 0; index < s.length; index++) {
    let key = str.indexOf(s[index]);
    if (key !== -1) {
      str.splice(0, key + 1);
    }
    str.push(s[index]);
    maxLength = Math.max(maxLength, str.length);
  }

  return maxLength;
};
