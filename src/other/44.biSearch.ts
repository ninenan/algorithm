const biSearch = (nums: number[], target: number): number => {
  let res = -1;
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const idx = Math.floor((start + end) / 2);
    const current = nums[idx];

    if (current === target) {
      res = idx;
      return res;
    }
    if (current < target) {
      start = idx + 1;
    } else if (current > target) {
      end = idx - 1;
    }
  }

  return res;
};

console.log(biSearch([1, 2, 3, 4, 5], 6));
