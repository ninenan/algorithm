// https://leetcode-cn.com/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/

/* 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
你可以假设数组是非空的，并且给定的数组总是存在多数元素。 */

/* 输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
输出: 2 */

const majorityElement = (numArr: number[]): number => {
  let current = -1,
    count = 0;
  for (let index = 0; index < numArr.length; index++) {
    if (count === 0) {
      current = numArr[index];
    }
    if (current === numArr[index]) {
      count++;
    } else {
      count--;
    }
  }
  return current;
};

console.log(majorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2])); // 2
