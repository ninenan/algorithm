// https://leetcode-cn.com/problems/subsets/

/* 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。 */

/* 输入：nums = [1,2,3]
输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] */

/* 输入：nums = [0]
输出：[[],[0]] */

// ✨✨✨✨✨
/* const subsets = (nums: number[]): number[][] => {
  let result: number[][] = [];
  let path: number[] = [];

  function backtracking(startIndex: number) {
    result.push(path.slice());
    for (let index = startIndex; index < nums.length; index++) {
      path.push(nums[index]);
      backtracking(index + 1);
      path.pop();
    }
  }

  backtracking(0);

  return result;
}; */

/* const subsets = (nums: number[]): number[][] => {
  let res: number[][] = [];

  const dfs = (index: number, list: number[]) => {
    if (index === nums.length) {
      res.push(list.slice());
      return;
    }
    list.push(nums[index]);
    dfs(index + 1, list);
    list.pop();
    dfs(index + 1, list);
  };

  dfs(0, []);

  return res;
}; */

/* const subsets = (nums: number[]): number[][] => {
  let res: number[][] = [];

  const dfs = (index: number, list: number[]) => {
    res.push(list.slice());
    for (let i = index; i < nums.length; i++) {
      list.push(nums[i]);
      dfs(i + 1, list);
      list.pop();
    }
  };
  dfs(0, []);

  return res;
}; */
