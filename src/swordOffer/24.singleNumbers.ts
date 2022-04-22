// https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof/

const singleNumbers = (nums: number[]): number[] => {
  let res: number[] = [];
  const len = nums.length;

  for (let index = 0; index < len; index++) {
    const i = res.indexOf(nums[index]);
    if (i > -1) {
      res.splice(i, 1);
      continue;
    } else {
      res.push(nums[index]);
    }
  }

  return res;
};

const singleNumbers2 = (nums: number[]): number[] => {
  let eor = 0,
    eorl = 0;
  for (let index = 0; index < nums.length; index++) {
    eor ^= nums[index];
  }

  let right = eor & (~eor + 1);

  for (let index = 0; index < nums.length; index++) {
    if ((nums[index] & right) === 0) {
      eorl ^= nums[index];
    }
  }

  return [eor ^ eorl, eorl];
};

export {};
