// https://leetcode-cn.com/problems/generate-parentheses/

/* 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
有效括号组合需满足：左括号必须以正确的顺序闭合。 */

/* 输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"] */

/* 输入：n = 1
输出：["()"] */

const generateParenthesis = (n: number): string[] => {
  const res: string[] = [];

  const dfs = (l: number, r: number, str: string) => {
    if (str.length === 2 * n) {
      res.push(str);
      return;
    }
    if (l > 0) {
      dfs(l - 1, r, str + "(");
    }
    if (l < r) {
      dfs(l, r - 1, str + ")");
    }
  };

  dfs(n, n, "");

  return res;
};
