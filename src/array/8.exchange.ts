// https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof/

// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。

/* 输入：nums = [1,2,3,4]
输出：[1,3,2,4] 
注：[3,1,2,4] 也是正确的答案之一。 */

const swapArr = (numArr: number[], start: number, end: number) => {
  [numArr[start], numArr[end]] = [numArr[end], numArr[start]];
};

const exchange = (numArr: number[]): number[] => {
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
