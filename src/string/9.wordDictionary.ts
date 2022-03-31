// void addWord(word)
// bool search(word)
// search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
// . 可以表示任何一个字母。

// 示例

// addWord("bad")
// addWord("dad")
// addWord("mad")
// search("pad") -> false
// search("bad") -> true
// search(".ad") -> true
// search("b..") -> true
// 说明:
// 你可以假设所有单词都是由小写字母 a-z 组成的。

class WordDictionary {
  words: {
    [prop: string]: string[];
  };

  constructor() {
    this.words = {};
  }

  addWord(str: string): void {
    if (this.words[str.length]) {
      this.words[str.length].push(str);
    } else {
      this.words[str.length] = [str];
    }
  }

  search(word: string): boolean {
    if (!this.words[word.length]) return false;
    const currentWordsArr = this.words[word.length];
    if (!word.includes(".")) return currentWordsArr.includes(word);
    const RE = new RegExp(word);
    return currentWordsArr.some((word) => RE.test(word));
  }
}

const wordDictionary = new WordDictionary();

wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
console.log(wordDictionary.search("pad")); // false
console.log(wordDictionary.search("bad")); // true
console.log(wordDictionary.search(".ad")); // true
console.log(wordDictionary.search("b..")); // true
