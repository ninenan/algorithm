// https://leetcode.cn/problems/reformat-the-string/

const reformat = (str: string): string => {
  let sumDigit = 0;

  for (let index = 0; index < str.length; index++) {
    if (isNum(str[index])) {
      sumDigit ++;
    }
  }

  let sumStr = str.length - sumDigit;

  if (Math.abs(sumDigit - sumStr) > 1) {
    return '';
  }

  let flag = sumDigit > sumStr;
  const arr = [...str];

  for (let index = 0, j = 1; index < str.length; index += 2) {
    if (isNum(str[index]) !== flag) {
      while (isNum(arr[j]) !== flag) {
        j += 2;
      }
      [arr[index], arr[j]] = [arr[j], arr[index]];
    }
  }

  return arr.join('');
}

const isNum = (str: string): boolean => /\d/.test(str)


export {}
