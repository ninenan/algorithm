// https://leetcode-cn.com/problems/valid-parentheses/submissions/
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

/* 有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合 */

/* 输入：s = "()"
输出：true */

/* 输入：s = "()[]{}"
输出：true */

/* 输入：s = "(]"
输出：false */

/* 输入：s = "([)]"
输出：false */

/* 输入：s = "{[]}"
输出：true */

/* const isValid = (str: string): boolean => {
  if (str.length % 2 === 1) {
    return false;
  }

  const pairsMap: Map<string, String> = new Map([
    ["(", ")"],
    ["{", "}"],
    ["[", "]"],
  ]);

  let stack: string[] = [];

  for (const item of str) {
    if (pairsMap.has(item)) {
      if (!str.length || stack[stack.length - 1] !== pairsMap.get(item)) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(item);
    }
  }
  console.log("stack :>> ", stack);

  return !stack.length;
}; */

const isValid = (str: string): boolean => {
  let stack: string[] = [];
  for (const item of str) {
    if (item === "(") {
      stack.push(")");
    } else if (item === "{") {
      stack.push("}");
    } else if (item === "[") {
      stack.push("]");
    } else if (stack.length === 0 || item !== stack.pop()) {
      return false;
    }
  }

  return !stack.length;
};

console.log(isValid("[]")); // true
console.log(isValid("{}")); // true
console.log(isValid("()")); // true
