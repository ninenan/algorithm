// https://leetcode.cn/problems/JEj789/

const minCost = (costs: number[][]): number => {
  if (!costs.length) {
    return 0;
  }

  const len = costs.length;
  const row = costs[0].length;
  // 初始化二维数组
  const arr = new Array(len);

  for (let index = 0; index < len; index++) {
    arr[index] = new Array(3)
  }

  // 初始化状态值
  for (let index = 0; index < row; index++) {
    arr[0][index] = costs[0][index];
  }

  // 开始刷新每一个房子的状态值
  for (let index = 1; index < len; index++) {
    // 刷到当前房子时候，给当前房子选用第 0 种油漆对应的最小总价
    arr[index][0] = Math.min(arr[index - 1][1], arr[index - 1][2]) + costs[index][0];
    // 刷到当前房子时候，给当前房子选用第 1 种油漆对应的最小总价
    arr[index][1] = Math.min(arr[index - 1][2], arr[index - 1][0]) + costs[index][1];
    // 刷到当前房子时候，给当前房子选用第 2 种油漆对应的最小总价
    arr[index][2] = Math.min(arr[index - 1][1], arr[index - 1][0]) + costs[index][2];
  }

  return Math.min(arr[len - 1][0], arr[len - 1][1], arr[len - 1][2]);
}


// 最优解
const minCost2 = (costs: number[][]): number => {
  if (!costs.length) {
    return 0;
  }

  const len = costs.length;

  for (let index = 1; index < len; index++) {
    // now 表示粉刷到当前贩子是对应的价格状态
    const now = costs[index];
    // prev 表示粉刷到上一个房子时的价格状态
    const prev = costs[index - 1];
    // 更新当前状态下，刷三种油漆对应的三种价格
    now[0] += Math.min(prev[1], prev[2]);
    now[1] += Math.min(prev[0], prev[2]);
    now[2] += Math.min(prev[1], prev[0]);
  }

  return Math.min(costs[len - 1][0], costs[len - 1][1], costs[len - 1][2])
}

export {}
