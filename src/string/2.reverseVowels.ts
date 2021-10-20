// a e i o u 元音字母
// 编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

// 输入："hello"
// 输出："holle"

// 输入："leetcode"
// 输出："leotcede"

const isVowels = (str: string): boolean => {
  return "aeiouAEIOU".includes(str);
};

const swap = (strArr: string[], start: number, end: number) => {
  [strArr[start], strArr[end]] = [strArr[end], strArr[start]];
};

const reverseVowels = (str: string): string => {
  let result: string[] = str.split("");

  let start = 0,
    end = result.length - 1;

  while (start < end) {
    while (start < end && !isVowels(result[start])) {
      start++;
    }
    while (start < end && !isVowels(result[end])) {
      end--;
    }
    if (start < end) {
      swap(result, start, end);
      start++;
      end--;
    }
  }

  return result.join("");
};

console.log(reverseVowels("hello")); // holle
console.log(reverseVowels("holle")); // hello
console.log(reverseVowels("leetcode")); // leotcede
console.log(reverseVowels("leotcede")); // leetcode
console.log(reverseVowels(".,")); // .,
