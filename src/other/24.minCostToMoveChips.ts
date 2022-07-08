// https://leetcode.cn/problems/minimum-cost-to-move-chips-to-the-same-position/

const minCostToMoveChips = (pos: number[]): number => {
  let even = 0;
  let odd = 0;

  for (let index = 0; index < pos.length; index++) {
    if (pos[index] % 2) {
      even ++;
    } else {
      odd ++;
    }
  }

  return Math.min(odd, even);
}
