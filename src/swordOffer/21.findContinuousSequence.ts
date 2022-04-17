// https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/submissions/

const findContinuousSequence = (target: number): number[][] => {
  let max = (target >> 1) + 1,
    queue: number[] = [],
    res: number[][] = [],
    sum = 0;

  for (let index = 1; index <= max; index++) {
    sum += index;
    queue.push(index);

    while (sum > target) {
      sum -= queue.shift() as number;
    }

    if (sum === target && queue.length >= 2) {
      res.push([...queue]);
    }
  }

  return res;
};

export {};
