// https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/

const nextGreatestLetter = (letters: string[], target: string): string => {
  const len = letters.length;
  let result = letters[0];

  for (let index = 0; index < len; index++) {
    if (letters[index] > target) {
      result = letters[index];
      break;
    }
  }

  return result;
};

// 二分查找

// function nextGreatestLetter(letters: string[], target: string): string {
//     const len = letters.length
//     if (target >= letters[len - 1]) {
//         return letters[0]
//     }
//     let start = 0, end = len - 1

//     while(start < end) {
//         const mid = Math.floor((end - start) / 2) + start
//         if (letters[mid] > target) {
//             end = mid
//         } else {
//             start = mid + 1
//         }
//     }

//     return letters[start]
// };
