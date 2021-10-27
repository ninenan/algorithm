// https://leetcode-cn.com/problems/next-greater-element-i/

/* 给你两个 没有重复元素 的数组 nums1 和 nums2 ，其中nums1 是 nums2 的子集。
请你找出 nums1 中每个元素在 nums2 中的下一个比其大的值。
nums1 中数字 x 的下一个更大元素是指 x 在 nums2 中对应位置的右边的第一个比 x 大的元素。如果不存在，对应位置输出 -1 。 */

/* 输入: nums1 = [4,1,2], nums2 = [1,3,4,2].
输出: [-1,3,-1]
解释:
    对于 num1 中的数字 4 ，你无法在第二个数组中找到下一个更大的数字，因此输出 -1 。
    对于 num1 中的数字 1 ，第二个数组中数字1右边的下一个较大数字是 3 。
    对于 num1 中的数字 2 ，第二个数组中没有下一个更大的数字，因此输出 -1 。 */

/* 输入: nums1 = [2,4], nums2 = [1,2,3,4].
    输出: [3,-1]
    解释:
        对于 num1 中的数字 2 ，第二个数组中的下一个较大数字是 3 。
        对于 num1 中的数字 4 ，第二个数组中没有下一个更大的数字，因此输出 -1 。 */

/* const nextGreaterElement = (numArr1: number[], numArr2: number[]): number[] => {
  let result: number[] = [];
  for (let index = 0; index < numArr1.length; index++) {
    const element = numArr1[index],
      valIndex = numArr2.findIndex((item) => item === element);
    const diffArr = numArr2.slice(valIndex);
    const valArr = diffArr.filter((item) => item > element);
    if (valArr.length) {
      result.push(valArr[0]);
    } else {
      result.push(-1);
    }
  }

  return result;
}; */

const nextGreaterElement = (numArr1: number[], numArr2: number[]): number[] => {
  const cacheMap: Map<number, number> = new Map();
  const stack: number[] = [];
  for (let index = numArr2.length - 1; index >= 0; index--) {
    const element = numArr2[index];
    while (stack.length && element >= stack[stack.length - 1]) {
      stack.pop();
    }
    cacheMap.set(element, stack.length ? stack[stack.length - 1] : -1);
    stack.push(element);
  }
  const result = new Array(numArr1.length)
    .fill(0)
    .map((item, index) => cacheMap.get(numArr1[index]));

  return result as number[];
};

console.log(nextGreaterElement([2, 1, 3], [2, 3, 1])); // [ 3, -1, -1 ]
console.log(nextGreaterElement([1, 3, 5, 2, 4], [6, 5, 4, 3, 2, 1, 7])); // [7,7,7,7,7]
