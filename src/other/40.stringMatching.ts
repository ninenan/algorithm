// https://leetcode.cn/problems/string-matching-in-an-array/

const stringMatching = (words: string[]): string[] => {
  let res: string[] = [];
  
  if (!words.length) {
    return res;
  }

  for (let index = 0; index < words.length; index++) {
    const current = words[index];
    for (let j = 0; j < words.length; j++) {
      if (index === j) {
        continue;
      }
      if (words[j].includes(current)) {
        res.push(current);
        break;
      }
    }
  }

  return res;
}

export {};
