// https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/

type searchRangeType = (nums: number[], target: number) => number[];

const searchRange: searchRangeType = (nums, target) => {
  let res = [-1, -1];
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    while (start <= end && nums[start] !== target) {
      start++;
    }
    while (start <= end && nums[end] !== target) {
      end--;
    }
    if (start <= end) {
      res = [start, end];

      return res;
    }
  }

  return res;
};

type getType<T> = T extends (...args: infer R) => void ? R : unknown;
type searchRangeParamsType = getType<searchRangeType>;

/**
 * 根据二分查找，查找最大下标
 *
 * @param {number[]} nums - 目标数组
 * @param {number} target - 目标值
 * @returns {number} 最大值下标
 */
const searchEnd = (nums: number[], target: number): number => {
  // 定义默认输出
  let res = -1;
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    // 寻找中间值下标
    let cur = Math.floor((end + start) / 2);

    if (nums[cur] < target) {
      // 当中简值小于目标值
      // 最小值的下标是中间值的下一位
      start = cur + 1;
    } else if (nums[cur] === target) {
      // 当中间值等于目标值
      // 因为存在多个，需要的是最末尾的下标
      // 所以最小值的下标是当前中间值的下一位
      res = cur;
      start = cur + 1;
    } else {
      // 当中间值大于目标值
      // 最大值的下标是中间值的上一位
      end = cur - 1;
    }
  }
  return res;
};

/**
 * 根据二分查找，查找最小值下标
 *
 * @param {number[]} nums - 目标数组
 * @param {number} target - 目标值
 * @returns {number} 最小值下标
 */
const searchStart = (nums: number[], target: number): number => {
  // 定义默认输出值
  let res = -1;
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    // 获取中间值下标
    let cur = Math.floor((end + start) / 2);

    if (nums[cur] < target) {
      // 当前中间值小于目标值
      // 最小值的下标是中间值下标的下一位
      start = cur + 1;
    } else if (nums[cur] === target) {
      // 当前中间值等于目标值
      // 因为可以存在多个，需要的是最开始的下标
      // 所以最大值的下标是中间值下标的上一位
      res = cur;
      end = cur - 1;
    } else {
      // 当前中间值大于目标值
      // 最大值下标是中间值下标的上一位
      end = cur - 1;
    }
  }
  return res;
};

const searchRange2: searchRangeType = (nums, target) => {
  return [searchStart(nums, target), searchEnd(nums, target)];
};
