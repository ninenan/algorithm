// https://leetcode-cn.com/problems/valid-palindrome-ii/

const validPalindrome = (s: string): boolean => {
  const len = s.length;
  let start = 0,
    end = len - 1;
  const isPalindrome = (start: number, end: number): boolean => {
    while (start < end) {
      if (s[start] !== s[end]) {
        return false;
      }
      start++;
      end--;
    }

    return true;
  };

  while (start < end && s[start] === s[end]) {
    start++;
    end--;
  }

  if (isPalindrome(start + 1, end)) {
    return true;
  }

  if (isPalindrome(start, end - 1)) {
    return true;
  }

  return false;
};
