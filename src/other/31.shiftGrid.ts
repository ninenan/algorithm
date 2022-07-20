// https://leetcode.cn/problems/shift-2d-grid/

const shiftGrid = (grid: number[][], k: number): number[][] => {
  const m = grid.length;
  const n = grid[0].length;
  const res: number[][] = [];

  for (let index = 0; index < m; index++) {
    const row: number[] = [];

    for (let j = 0; j < n; j++) {
      row.push(0);
    }

    res.push(row)
  }
  
  for (let index = 0; index < m; index++) {
    for (let j = 0; j < n; j++) {
      const index1 = (index * n + j + k) % (m * n);

      res[Math.floor(index1 / n)].splice(index1 % n, 1, grid[index][j])
    }
  }

  return res;
}

const shiftGrid2 = (grid: number[][], k: number): number[][] => {
  const row = grid[0].length;
  const column = grid.length;
  let res = grid.flat(Infinity) as number[];
  const len = res.length;

  let num = k <= len ? k : k % len;
  const arr = res.splice(len - num);
  for (let index = arr.length - 1; index >= 0; index--) {
    res.unshift(arr[index])
  }

  const ret: number[][] = [];
  for (let index = 0; index < column; index++) {
    ret[index] = res.slice(index * row, row * (index + 1));
  }

  return ret;
}

export {}

