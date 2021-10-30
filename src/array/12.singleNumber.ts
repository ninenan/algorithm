// https://leetcode-cn.com/problems/single-number-iii/

/* 给定一个整数数组 nums，其中恰好有两个元素只出现一次，其余所有元素均出现两次。 找出只出现一次的那两个元素。你可以按 任意顺序 返回答案。
进阶：你的算法应该具有线性时间复杂度。你能否仅使用常数空间复杂度来实现？ */

/* 输入：nums = [1,2,1,3,2,5]
输出：[3,5]
解释：[5, 3] 也是有效的答案。 */

/* 输入：nums = [-1,0]
输出：[-1,0] */

/* 输入：nums = [0,1]
输出：[1,0] */

const singleNumber = (numArr: number[]): number[] => {
  let result: number[] = [],
    cacheMap: Map<number, number> = new Map();

  for (let index = 0; index < numArr.length; index++) {
    if (cacheMap.has(numArr[index])) {
      cacheMap.set(numArr[index], (cacheMap.get(numArr[index]) as number) + 1);
      continue;
    }
    cacheMap.set(numArr[index], 1);
  }

  for (const [key, value] of cacheMap) {
    if (value === 1) {
      result.push(key);
    }
  }

  return result;
};

console.log(singleNumber([1, 2, 1, 3, 2, 5]));
console.log(singleNumber([-1, 0]));
console.log(singleNumber([0, 1]));
console.log(singleNumber([]));
