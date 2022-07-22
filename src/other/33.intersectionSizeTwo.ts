// https://leetcode.cn/problems/set-intersection-size-at-least-two/

const intersectionSizeTwo = (intervals: number[][]): number => {
  if (!intervals.length) {
    return 0;
  }

  intervals.sort((a, b) => {
    if (a[1] !== b[1]) {
      return a[1] - b[1];
    }
    return  b[0] - a[0];
  })

  let a = -1;
  let b = -1;
  let res = 0;

  for (const [l, r] of intervals) {
    if (l > b) {
      a = r - 1;
      b = r;
      res += 2;
    } else if (l > a) {
      a = b;
      a = r;
      res ++;
    }
  }

  return res;
}

export {}
