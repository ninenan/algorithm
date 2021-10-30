// https://leetcode-cn.com/problems/li-wu-de-zui-da-jie-zhi-lcof/

/* 在一个 m*n 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。
你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。
给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？ */

/* 输入: 
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
输出: 12
解释: 路径 1→3→5→2→1 可以拿到最多价值的礼物 */

const maxValue = (grid: number[][]): number => {
  const row = grid.length;
  const col = grid[0].length;
  let dp: number[][] = [];
  for (let index = 0; index < row; index++) {
    dp[index] = [];
    for (let j = 0; j < col; j++) {
      dp[index][j] = 0;
    }
  }
  dp[0][0] = grid[0][0];

  for (let index = 1; index < row; index++) {
    dp[index][0] = grid[index][0] + dp[index - 1][0];
  }

  for (let index = 1; index < col; index++) {
    dp[0][index] = grid[0][index] + dp[0][index - 1];
  }

  for (let index = 1; index < row; index++) {
    for (let j = 1; j < col; j++) {
      dp[index][j] =
        grid[index][j] + Math.max(dp[index - 1][j], dp[index][j - 1]);
    }
  }

  return dp[row - 1][col - 1];
};
