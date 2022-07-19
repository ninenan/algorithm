// https://leetcode.cn/problems/number-of-islands/

// DFS
const numIsLands = (grid: string[][]): number => {
  // 对当前盒子垂直和水平方向上相邻盒子的检查
  const moveX = [0, 1, 0, -1];
  const moveY = [1, 0, -1, 0];

  // 处理边界
  if (!grid || !grid.length || !grid[0].length) {
    return 0;
  }

  // 岛屿数量
  let count = 0;
  let row = grid.length;
  let column = grid[0].length;
  // 探索岛屿边界逻辑
  const dfs = (grid: string[][], index:number, j: number):void => {
    if (index < 0 || index >= row || j < 0 || j >= column || grid[index][j] === '0') {
      return;
    }

    // 遍历过的位置都置为 0，防止重复遍历
    grid[index][j] = '0';

    // 遍历完当前的 1，继续寻找下一个 1
    for (let k = 0; k < 4; k++) {
      dfs(grid, index + moveX[k], j + moveY[k]);
    }
  }

  for (let index = 0; index < row; index++) {
    for (let j = 0; j < column; j++) {
      if (grid[index][j] === '1') {
        // 每遇到1，就进入 DFS，探索岛屿边界
        dfs(grid, index, j);
        // 没完成一个 DFS，就类加一个岛屿
        count ++;
      }
    }
  }

  return count;
}

const numIsLands2 = (grid: string[][]): number => {
  if (!grid || !grid.length || !grid[0].length) {
    return 0;
  }

  let count = 0;
  let row = grid.length;
  let column = grid[0].length;
  const dfs = (index: number, j: number):void => {
    if (index < 0 || index >= row || j < 0 || j >= column || grid[index][j] === '0') {
      return;
    }

    grid[index][j] = '0';
    if (grid[index + 1] && grid[index + 1][j] === '1') {
      dfs(index + 1, j);
    }
    if (grid[index - 1] && grid[index - 1][j] === '1') {
      dfs(index - 1, j);
    }
    if (grid[index][j + 1] && grid[index][j + 1] === '1') {
      dfs(index, j + 1);
    }
    if (grid[index][j - 1] && grid[index][j - 1] === '1') {
      dfs(index, j - 1);
    }
  }

  for (let index = 0; index < row; index++) {
    for (let j = 0; j < column; j++) {
      if (grid[index][j] === '1') {
        dfs(index, j)
        count ++;
      }
    }
  }

  return count;
}

export {}
