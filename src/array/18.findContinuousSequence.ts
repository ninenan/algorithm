// https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/

/* 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。
序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。 */

/* 输入：target = 9
输出：[[2,3,4],[4,5]] */

/* 输入：target = 15
输出：[[1,2,3,4,5],[4,5,6],[7,8]] */

const findContinuousSequence = (target: number): number[][] => {
  /* 根据题意可知 需要解决两个关键问题
        1. target的可选范围 根据推演可得到 [1, max] max = (target >> 1) + 1
        2. 构造一个单调递增队列
            a. 当 累加值 sum 大于 target 时 queue 出队 且 sum 减去出队值 sum -= queue.shift()
            b. 当 累加值 等于 target 且 至少包含两项时 将此时的有效 queue 存入 结果集res 中
    */

  let max = (target >> 1) + 1, // 可选的最大正数范围 [1, max]
    queue: number[] = [], // 单调递增队列
    res: number[][] = []; // 结果
  let sum = 0;

  for (let index = 1; index <= max; index++) {
    // 一次将范围值入队
    sum += index;
    queue.push(index);
    // 当大于期望值target 时 出队且更新sum
    while (sum > target) {
      sum -= queue.shift() as number;
    }
    // 当满足条件 存入结果
    if (sum === target && queue.length >= 2) {
      res.push([...queue]);
    }
  }

  return res;
};

console.log(findContinuousSequence(9));
console.log(findContinuousSequence(15));
