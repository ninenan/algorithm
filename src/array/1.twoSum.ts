// https://leetcode-cn.com/problems/two-sum/

/* 
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
你可以按任意顺序返回答案。 */

/* 输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。 */

/* 输入：nums = [3,2,4], target = 6
输出：[1,2] */

/* 输入：nums = [3,3], target = 6
输出：[0,1] */

// map
const twoSum = (numArr: number[], target: number): number[] => {
  let result: number[] = [],
    cacheMap: Map<number, number> = new Map();

  for (let index = 0; index < numArr.length; index++) {
    const element = numArr[index];
    const diff = target - element;
    if (cacheMap.has(diff)) {
      result.push(index, cacheMap.get(diff) as number);
      break;
    }
    cacheMap.set(element, index);
  }

  return result;
};

console.log(twoSum([2, 7, 11, 15], 9)); // [1, 0]
console.log(twoSum([2, 7, 11, 15], 13)); // [2, 0]
console.log(twoSum([3, 3], 6)); // [1, 0]

// 双指针 必须是从小到达的排列
const twoSum2 = (numArr: number[], target: number): number[] => {
  let start = 0,
    end = numArr.length - 1,
    result: number[] = [];
  while (start < end) {
    const total = numArr[start] + numArr[end];
    if (total === target) {
      result.push(numArr[start], numArr[end]);
      return result;
    } else if (total > target) {
      end--;
    } else {
      start++;
    }
  }
  return result;
};
