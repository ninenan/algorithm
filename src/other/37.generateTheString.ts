// https://leetcode.cn/problems/generate-a-string-with-characters-that-have-odd-counts/

const generateTheString = (n: number): string => {
  if (n % 2 === 0) {
    return 'n'.repeat(n - 1) + 'm';
  }

  return 'n'.repeat(n);
}
