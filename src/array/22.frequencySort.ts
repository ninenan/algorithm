// https://leetcode-cn.com/problems/sort-array-by-increasing-frequency/

const frequencySort = (nums: number[]): number[] => {
  let result: number[] = [];
  const cache = new Map<number, number[]>();

  for (let index = 0; index < nums.length; index++) {
    const current = nums[index];
    if (cache.has(current)) {
      let val = cache.get(current) as number[];
      val.push(current);
      cache.set(current, val);
      continue;
    }
    cache.set(current, [current]);
  }

  const arr = [];
  for (const val of cache.values()) {
    arr.push(val);
  }
  arr.sort((a, b) =>
    a.length === b.length ? b[0] - a[0] : a.length - b.length
  );

  result = arr.flat(Infinity) as number[];
  return result;
};
