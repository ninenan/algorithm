// https://leetcode-cn.com/problems/move-zeroes/

// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

/* 输入: [0,1,0,3,12]
输出: [1,3,12,0,0] */

/* 说明:
必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。 */

/* const moveZeroes = (numArr: number[]): number[] => {
  let count = 0;
  for (let index = 0; index < numArr.length; index++) {
    if (numArr[index] === 0) {
      numArr.splice(index, 1);
      index--;
      count++;
    }
  }
  if (count) {
    for (let index = 0; index < count; index++) {
      numArr.push(0);
    }
  }
  return numArr;
}; */

/* const moveZeroes = (numArr: number[]): number[] => {
  let j = 0;
  for (let index = 0; index < numArr.length; index++) {
    if (numArr[index] !== 0) {
      numArr[j] = numArr[index];
      if (index !== j) {
        numArr[index] = 0;
      }

      j++;
    }
  }

  return numArr;
}; */

const moveZeroes = (numArr: number[]): number[] => {
  let j = 0;
  for (let index = 0; index < numArr.length; index++) {
    if (numArr[index] !== 0) {
      const temp = numArr[j];
      numArr[j] = numArr[index];
      numArr[index] = temp;
      j++;
    }
  }

  return numArr;
};

console.log(moveZeroes([0, 1, 0, 3, 12])); // [ 1, 3, 12, 0, 0 ]
console.log(moveZeroes([1, 3])); // [ 1, 3]
