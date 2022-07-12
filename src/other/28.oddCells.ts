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
