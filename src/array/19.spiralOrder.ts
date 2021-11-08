// https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof/

// 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

/* 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5] */

/* 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7] */

const spiralOrder = (matrix: number[][]): number[] => {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }

  const rows = matrix.length,
    columns = matrix[0].length,
    order = [];
  let left = 0,
    right = columns - 1,
    top = 0,
    bottom = rows - 1;

  while (left <= right && top <= bottom) {
    for (let column = left; column <= right; column++) {
      order.push(matrix[top][column]);
    }

    for (let row = top + 1; row <= bottom; row++) {
      order.push(matrix[row][right]);
    }

    if (left < right && top < bottom) {
      for (let column = right - 1; column > left; column--) {
        order.push(matrix[bottom][column]);
      }
      for (let row = bottom; row > top; row--) {
        order.push(matrix[row][left]);
      }
    }
    [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1];
  }

  return order;
};

console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ])
); // [1,2,3,4,8,12,11,10,9,5,6,7]
console.log(
  spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
); // [1,2,3,6,9,8,7,4,5]
