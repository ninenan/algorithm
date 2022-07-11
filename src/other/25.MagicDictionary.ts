// https://leetcode.cn/problems/implement-magic-dictionary/

class MagicDictionary {
  dictionary: string[]
  constructor() {
    this.dictionary = [];
  }

  buildDict (dictionary: string[]): void {
    this.dictionary = dictionary;
  }

  search(searchWord: string): boolean {
    for (const word of this.dictionary) {
      if (word.length !== searchWord.length) {
        continue;
      }

      let diff = 0;
      for (let index = 0; index < word.length; index++) {
        if (word[index] !== searchWord[index]) {
          diff ++;
          if (diff > 1) {
            break;
          }
        }
      }
      if (diff === 1) {
        return true;
      }
    }

    return false;
  }
}
