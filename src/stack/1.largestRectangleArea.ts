// https://leetcode-cn.com/problems/largest-rectangle-in-histogram/

/* 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
求在该柱状图中，能够勾勒出来的矩形的最大面积。 */

/* 输入：heights = [2,1,5,6,2,3]
输出：10
解释：最大的矩形为图中红色区域，面积为 10 */

/* 输入： heights = [2,4]
输出： 4 */

const largestRectangleArea = (heights: number[]): number => {
  let maxArea = 0;
  const stack: number[] = [],
    heightArr: number[] = [0, ...heights, 0];
  for (let index = 0; index < heightArr.length; index++) {
    while (heightArr[index] < heightArr[stack[stack.length - 1]]) {
      const stackTopIndex = stack.pop() as number;
      maxArea = Math.max(
        maxArea,
        heightArr[stackTopIndex] * (index - stack[stack.length - 1] - 1)
      );
    }
    stack.push(index);
  }

  return maxArea;
};
