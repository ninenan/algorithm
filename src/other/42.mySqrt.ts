// https://leetcode.cn/problems/sqrtx/

let mySqrt = (x: number): number => {
  let l = 0; // 最小值
  let r = x; // 最大值
  let ans = 0; // 结果

  while (l <= r) {
    // 获取中间值
    let mid = Math.floor((l + r) / 2);
    // 判断中间值是否满足
    if (mid * mid <= x) {
      ans = mid;
      l = mid + 1;
    } else {
      // 不满足改变最大值，缩小范围
      r = mid - 1;
    }
  }

  return ans;
};

console.log(mySqrt(8));

const biSearch = (nums: number[], target: number) => {
  let res = -1;
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const midIdx = Math.floor((start + end) / 2);

    if (nums[midIdx] === target) {
      res = midIdx;
      return res;
    }
    if (nums[midIdx] < target) {
      start = midIdx + 1;
    }
    if (nums[midIdx] > target) {
      end = midIdx - 1;
    }
  }

  return res;
};

console.log(biSearch([1, 2, 3, 5, 6, 8, 9], 1));
