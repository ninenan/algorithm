// https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/submissions/

const lastRemaining = (n: number, m: number) => {
  let res = 0;

  for (let index = 0; index <= n; index++) {
    res = (res + m) % index;
  }

  return res;
};

export {};
