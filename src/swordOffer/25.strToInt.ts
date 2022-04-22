// https://leetcode-cn.com/problems/ba-zi-fu-chuan-zhuan-huan-cheng-zheng-shu-lcof/submissions/

const strToInt = (str: string): number => {
  let res = 0;
  const RE = /^[+-]?\d+/;
  const min = -(2 ** 31),
    max = 2 ** 31 - 1;

  if (!RE.test(str.trim())) return res;

  res = +str.trim().match(RE)[0];

  return res <= min ? min : res >= max ? max : res;
};
