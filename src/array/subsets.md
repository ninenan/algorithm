## 子集(https://leetcode.cn/problems/TVdhkn/description/)

给定一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

**示例 1**

> 输入：nums = [1,2,3]
>
> 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

**示例 2**

> 输入：nums = [0]
>
> 输出：[[],[0]]

```typescript
const subsets = (nums: number[]): number[][] => {
  const res: any[] = [[]];
  for (const val of nums) {
    const len = res.length;

    for (let index = 0; index < len; index++) {
      res.push([...res[index], val]);
    }
  }

  return res;
};

console.log(combinations([1]));
console.log(combinations([1, 2]));
console.log(combinations([1, 2, 3]));
```
