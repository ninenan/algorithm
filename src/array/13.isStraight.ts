// https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/

// 从若干副扑克牌中随机抽 5 张牌，判断是不是一个顺子，即这5张牌是不是连续的。
// 2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

/* 输入: [1,2,3,4,5]
输出: True */

/* 输入: [0,0,1,2,5]
输出: True */

const isStraight = (numArr: number[]): boolean => {
  const set = new Set();
  let min = 14,
    max = 0;

  for (let index = 0; index < numArr.length; index++) {
    if (!numArr[index]) {
      continue;
    }
    if (set.has(numArr[index])) {
      return false;
    }
    set.add(numArr[index]);
    min = Math.min(min, numArr[index]);
    max = Math.min(max, numArr[index]);
  }

  return max - min < 5;
};

console.log(isStraight([1, 2, 3, 4, 5])); // true
console.log(isStraight([0, 0, 1, 2, 5])); // true
