// https://leetcode.cn/problems/replace-words/

const replaceWords = (dictionary: string[], sentence: string): string => {
  const dictionaryMap = new Map<string, string>();
  const words = sentence.split(" ");

  for (const root of dictionary) {
    dictionaryMap.set(root, root);
  };

  for (let index = 0; index < words.length; index++) {
    const word = words[index];
    for (let j = 0; j < word.length; j++) {
      if (dictionaryMap.has(word.substring(0, 1 + j))) {
        words[index] = dictionaryMap.get(word.substring(0, 1 + j)) as string;
        break;
      }
    }
  }

  return words.join(' ');
}
