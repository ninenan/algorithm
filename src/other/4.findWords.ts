// https://leetcode-cn.com/problems/keyboard-row/

/* 给你一个字符串数组 words ，只返回可以使用在 美式键盘 同一行的字母打印出来的单词。键盘如下图所示。
美式键盘 中：
第一行由字符 "qwertyuiop" 组成。
第二行由字符 "asdfghjkl" 组成。
第三行由字符 "zxcvbnm" 组成。 */

/* 输入：words = ["Hello","Alaska","Dad","Peace"]
输出：["Alaska","Dad"] */

/* 输入：words = ["omk"]
输出：[] */

/* 输入：words = ["adsdf","sfd"]
输出：["adsdf","sfd"] */

const findWords = (strArr: string[]): string[] => {
  let result: string[] = [],
    dictionary: string[] = ["qwertyuiop", " asdfghjkl", "zxcvbnm"];

  dictionary.forEach((element) => {
    result.push(
      ...strArr.filter((str) => {
        return str
          .toLocaleLowerCase()
          .split("")
          .every((item) => element.includes(item));
      })
    );
  });

  return result;
};

console.log(findWords(["Hello", "Alaska", "Dad", "Peace"]));
console.log(findWords(["adsdf", "sfd"]));
console.log(findWords(["omk"]));
