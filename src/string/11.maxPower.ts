// https://leetcode-cn.com/problems/consecutive-characters/

const maxPower = (s: string): number => {
  let res = 1;

  if (s.length === 1) return res;

  const len = s.length;
  let count = 0;

  for (let index = 1; index < len; index++) {
    if (s[index] === s[index - 1]) {
      ++count;
      res = Math.max(res, count);
    } else {
      count = 1;
    }
  }
  return res;
};

maxPower("leetcode");
