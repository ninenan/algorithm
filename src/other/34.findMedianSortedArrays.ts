// https://juejin.cn/book/6844733800300150797/section/6844733800375648264
// 题目描述：给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
// 请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
// 你可以假设 nums1 和 nums2 不会同时为空。

// 示例 1: nums1 = [1, 3]
// nums2 = [2]
// 则中位数是 2.0

// 示例 2:
// nums1 = [1, 2]
// nums2 = [3, 4]
// 则中位数是 (2 + 3)/2 = 2.5

const findMedianSortedArr = (nums1: number[], nums2: number[]): number => {
  const len1 = nums1.length;
  const len2 = nums2.length;

  // 确保第一个数组总是较短的数组
  if (len1 > len2) {
    return findMedianSortedArr(nums2, nums1);
  }

  const len = len2 + len1;

  // 初始化第一个数组“切分”位置
  let slice1 = 0;
  // 初始化第二个数组“切分”位置
  let slice2 = 0;
  // 初始化第一个数组二分的左端点
  let slice1L = 0;
  // 初始化第一个数组二分的右端点
  let slice1R = len1;

  while (slice1 <= len1) {
    slice1 = Math.floor(( slice1R - slice1L ) / 2 + slice1L);
    slice2 = Math.floor(len / 2 - slice1);

    const L1 = (slice1  === 0) ? -Infinity : nums1[slice1 - 1];
    const L2 = (slice2 === 0) ? -Infinity : nums2[slice2 - 1];
    const R1 = (slice1 === len1) ? Infinity : nums1[slice1];
    const R2 = (slice2 === len2) ? Infinity : nums2[slice2];

    if (L1 > L2) {
      slice1R = slice1 - 1
    } else if (L2 > R1) {
      slice1L = slice1 + 1
    } else {
      if (len % 2 === 0) {
        const L = L1 > L2 ? L1 : L2;
        const R = R1 < R2 ? R1 : R2;

        return (L + R) /2
      } else {
        const median = (R1 < R2) ? R1 : R2;

        return median;
      }
    }
  }

  return -1;
}

