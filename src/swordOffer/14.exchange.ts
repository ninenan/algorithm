// https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/

const swapArr = (numArr: number[], starIdx: number, endIdx: number) => {
  [numArr[starIdx], numArr[endIdx]] = [numArr[endIdx], numArr[starIdx]];
};
const exchange = (numArr: number[]): number[] => {
  if (numArr.length <= 1) return numArr;

  let start = 0,
    end = numArr.length - 1;
  while (start < end) {
    while (start < end && numArr[start] % 2 !== 0) {
      start++;
    }
    while (start < end && numArr[end] % 2 === 0) {
      end--;
    }
    if (start < end) {
      swapArr(numArr, start, end);
      start++;
      end--;
    }
  }

  return numArr;
};

export {};
