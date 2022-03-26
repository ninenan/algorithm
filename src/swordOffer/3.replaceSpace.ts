// https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/

const replaceSpace = (str: string): string => {
  const RE = /\s/g;
  return str.replace(RE, "%20");
};
