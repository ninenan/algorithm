// 示例 1:
// 输入: [[1,3],[2,6],[8,10],[15,18]]
// 输出: [[1,6],[8,10],[15,18]]
// 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

// 示例 2:
// 输入: [[1,4],[4,5]]
// 输出: [[1,5]]
// 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。

const merge = (intervals: number[][]): number[][] => {
  if (!intervals.length) {
    return []
  }

  const res: number[][] = [];
  const len = intervals.length;

  // 按照第一个元素从小到大排序
  intervals.sort((a, b) => a[0] - b[0]);
  // 初始化
  res.push(intervals[0]);

  for (let index = 1; index < len; index++) {
    // 获取结果数组的最后一个元素
    const prev = res[res.length - 1];

    if (prev[1] >= intervals[index][0]) {
      prev[1] = Math.max(prev[1], intervals[index][1])
    } else {
      res.push(intervals[index]);
    }
  }

  return res;
}
