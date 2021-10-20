/* 给定一个字符串 s 和一个整数 k，从字符串开头算起，每 2k 个字符反转前 k 个字符。

如果剩余字符少于 k 个，则将剩余字符全部反转。
如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。 */

/* 输入：s = "abcdefg", k = 2
输出："bacdfeg */

/* 输入：s = "abcd", k = 2
输出："bacd" */

const swapStrArr = (strArr: string[], start: number, end: number) => {
  while (start < end) {
    [strArr[start], strArr[end]] = [strArr[end], strArr[start]];
    start++;
    end--;
  }
};

const reverseStr = (str: string, k: number): string => {
  let result: string[] = str.split("");
  for (let index = 0; index < result.length; index += 2 * k) {
    swapStrArr(result, index, Math.min(index + k, result.length) - 1);
  }

  return result.join("");
};

console.log(reverseStr("abcdefg", 2)); // bacdfeg
console.log(reverseStr("abcd", 2)); // bacd
