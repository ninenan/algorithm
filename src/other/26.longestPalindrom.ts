// https://leetcode.cn/problems/longest-palindromic-substring/

const longestPalindrome = (str: string): string => {
  const dp: number[][] = [];
  // 缓存字符串长度
  const len = str.length;

  // 初始化二维数组
  for (let index = 0; index < len; index++) {
    dp[index] = []
  }

  let start = 0;
  let end = 0;

  for (let index = 0; index < len; index++) {
    dp[index][index] = 1;
  }

  for (let index = 0; index < len - 1; index++) {
    if (str[index] === str[index + 1]) {
      dp[index][index + 1] = 1;
      start = index;
      end = index + 1;
    }
  }

  for (let n = 3; n <= len; n++) {
    for (let index = 0; index <= len - n; index++) {
      let j = index + n - 1;
      if (dp[index + 1][j - 1]) {
        if (str[index] === str[j]) {
          dp[index][j] = 1;
          start = index;
          end = j;
        }
      }
    }
  }

  return str.substring(start, end + 1);
}

console.log(longestPalindrome('babad')) // "aba" / "bab"
console.log(longestPalindrome('cbbd')) // "bb"
console.log(longestPalindrome('bb')) // "bb"
