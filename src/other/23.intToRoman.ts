// https://leetcode.cn/problems/integer-to-roman/

const intToRoman = (num: number): string => {
  const valueArr:[number, string][] = [
    [1000, "M"], 
    [900, "CM"], 
    [500, "D"], 
    [400, "CD"], 
    [100, "C"], 
    [90, "XC"], 
    [50, "L"], 
    [40, "XL"], 
    [10, "X"], 
    [9, "IX"], 
    [5, "V"], 
    [4, "IV"], 
    [1, "I"]
  ];
  const res = [];

  for (const [value, str] of valueArr) {
    while (num >= value) {
      num -= value;
      res.push(str)
    }
    if (num === 0) break;
  }

  return res.join('');
}
