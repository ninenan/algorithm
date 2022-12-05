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
