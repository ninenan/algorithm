// https://leetcode.cn/problems/rank-transform-of-an-array/

const arrayRankTransform = (arr: number[]): number[] => {
  const arr1 = [...new Set(arr)].sort((a, b) => a - b);
  const res:number[] = [];
  let obj: {
    [props: string]: number
  } = {};

  arr1.forEach((item, index) => {
    obj[item] = index;
  })

  for (const item of arr) {
    res.push(obj[item]);
  }

  return res;
}

export {};
