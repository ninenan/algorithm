// https://leetcode-cn.com/problems/group-anagrams/

/* 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母都恰好只用一次。 */

/* 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]] */

/* 输入: strs = [""]
输出: [[""]] */

/* 输入: strs = ["a"]
输出: [["a"]] */

const groupAnagrams = (strArr: string[]): string[][] => {
  let cacheMap: Map<string, string[]> = new Map();

  for (const item of strArr) {
    const itemStr = [...item].sort().join("");
    const list = cacheMap.has(itemStr) ? cacheMap.get(itemStr) : [];
    list?.push(item);
    cacheMap.set(itemStr, list as string[]);
  }

  return [...cacheMap.values()];
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
