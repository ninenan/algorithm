// https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/

const firstUniqChar = (str: string): string => {
  if (!str.length) return " ";
  const map = new Map<string, number>();

  for (let index = 0; index < str.length; index++) {
    const currentStr = str[index];
    if (map.has(currentStr)) {
      let val = map.get(currentStr) as number;
      map.set(currentStr, ++val);
    } else {
      map.set(currentStr, 1);
    }
  }

  for (const [key, val] of map) {
    if (val === 1) return key;
  }
  return " ";
};
