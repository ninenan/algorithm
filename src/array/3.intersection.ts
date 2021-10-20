// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]

// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[9,4]

const intersection = (numArr1: number[], numArr2: number[]): number[] => {
  return [...new Set(numArr1.filter((num) => numArr2.includes(num)))];
};

console.log(intersection([1, 2, 2, 1], [2, 2])); // [2]
console.log(intersection([4, 9, 5], [9, 4, 9, 8, 4])); // [4, 9]
