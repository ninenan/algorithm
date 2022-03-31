/*
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组。
说明:
初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n ）来保存 nums2 中的元素。
*/

// 输入:
// nums1 = [1, 2, 3, 4], m = 4
// nums2 = [2, 5, 6], n = 3

// 输出: [1, 2, 2, 3, 4, 5, 6]

const _merge = (
  numArr1: number[],
  numArr1Length: number,
  numArr2: number[],
  numArr2Length: number
): number[] => {
  let totalLength = numArr1Length + numArr2Length - 1;
  let lLength = numArr1Length - 1;
  let rLength = numArr2Length - 1;

  while (rLength >= 0) {
    if (lLength < 0) {
      numArr1[totalLength--] = numArr2[rLength--];
      continue;
    }
    numArr1[totalLength--] =
      numArr1[lLength] > numArr2[rLength]
        ? numArr1[lLength--]
        : numArr2[rLength--];
  }

  return numArr1;
};

const merge = (
  numArr1: number[],
  numArr1Length: number,
  numArr2: number[],
  numArr2Length: number
): number[] => {
  let totalLen = numArr1Length + numArr2Length - 1;
  let lLen = numArr1Length - 1;
  let rLen = numArr2Length - 1;

  while (lLen >= 0 && rLen >= 0) {
    if (numArr1[lLen] >= numArr2[rLen]) {
      numArr1[totalLen] = numArr1[lLen];
      lLen--;
    } else {
      numArr1[totalLen] = numArr2[rLen];
      rLen--;
    }
    totalLen--;
  }

  while (rLen >= 0) {
    numArr1[totalLen] = numArr2[rLen];
    totalLen--;
    rLen--;
  }

  return numArr1;
};

console.log(_merge([1, 2, 3, 4], 4, [2, 5, 6], 3)); // [1, 2, 2, 3, 4, 5, 6]
console.log(merge([1, 2, 3, 4], 4, [2, 5, 6], 3)); // [1, 2, 2, 3, 4, 5, 6]
