// https://leetcode-cn.com/problems/valid-anagram/

/* 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？ */

/* 输入: s = "anagram", t = "nagaram"
输出: true */

/* 输入: s = "rat", t = "car"
输出: false */

const isAnagram = (str: string, targetStr: string): boolean => {
  let cacheMap: Map<string, number> = new Map();

  for (let index = 0; index < str.length; index++) {
    if (cacheMap.has(str[index])) {
      cacheMap.set(str[index], (cacheMap.get(str[index]) || 0) + 1);
      continue;
    }
    cacheMap.set(str[index], 1);
  }

  for (let index = 0; index < targetStr.length; index++) {
    const element = targetStr[index];
    if (cacheMap.has(element)) {
      cacheMap.set(element, (cacheMap.get(element) as number) - 1);
      continue;
    }
    return false;
  }

  return [...cacheMap.values()].every((item) => item === 0);
};

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
