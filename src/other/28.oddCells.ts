// https://leetcode.cn/problems/cells-with-odd-values-in-a-matrix/

const oddCells = (m: number, n: number, indices: number[][]): number => {
  let res = 0;
  const rows = (new Array(m)).fill(0);
  const cols = (new Array(n)).fill(0);

  for (const [row, col] of indices) {
    rows[row]++;
    cols[col]++;
  }

  for (let index = 0; index < rows.length; index++) {
    for (let j = 0; j < cols.length; j++) {
      if ((rows[index] + cols[j]) % 2 !== 0) {
        res ++;
      }
    }
  }

  return res;
}

const oddCells2 = (m: number, n: number, indices: number[][]): number => {
  let oddx = 0;
  let oddy = 0;
  const rows = (new Array(m)).fill(0);
  const cols = (new Array(n)).fill(0);

  for (const [row, col] of indices) {
    rows[row]++;
    cols[col]++;
  }

  for (let index = 0; index < rows.length; index++) {
    if ((rows[index] & 1) !== 0) {
      oddx++;
    }
  }

  for (let index = 0; index < cols.length; index++) {
    if ((cols[index] & 1) !== 0) {
      oddy++;
    }
  }

  return oddx * (n - oddy) + oddy * (m - oddx);
}

export {}
