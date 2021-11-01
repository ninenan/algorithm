// https://leetcode-cn.com/problems/container-with-most-water/

/* 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。
找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
说明：你不能倾斜容器。 */

/* 输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。 */

/* 输入：height = [1,1]
输出：1 */

/* 输入：height = [4,3,2,1,4]
输出：16 */

const maxArea = (height: number[]): number => {
  let result = 0,
    start = 0,
    end = height.length - 1;

  while (start < end) {
    let minHeight =
      height[start] > height[end] ? height[end--] : height[start++];
    result = Math.max(result, (end - start + 1) * minHeight);
  }

  return result;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxArea([1, 7]));
console.log(maxArea([1, 1]));
console.log(maxArea([4, 3, 2, 1, 4]));
