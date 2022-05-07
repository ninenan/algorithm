// https://leetcode-cn.com/problems/daily-temperatures/

const dailyTemperatures = (nums: number[]): number[] => {
  const len = nums.length;
  const res: number[] = new Array(len).fill(0);
  const stack: number[] = [];

  for (let index = 0; index < len; index++) {
    while (stack.length && nums[index] > nums[stack[stack.length - 1]]) {
      const top = stack.pop() as number;
      res[top] = index - top;
    }

    stack.push(index);
  }

  return res;
};

