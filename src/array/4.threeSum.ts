// https://leetcode-cn.com/problems/3sum/

/* 为了防止结果数组中加入重复的元素，我们可以将 nums 进行排序，例如第一个数 nums[i] === nums[i-1] 时，
nums[i] 作为第一个数与 nums[i-1] 作为第一个数得到的满足条件的三元组是一致的，
所以此时 nums[i] 我们将不再进行判断，避免重复三元组，当然这只是第一个数，第二个数与第三个数的判断也是类似的。*/

// 解题思路： 先数组排序，排序完后遍历数组，以 nums[i] 作为第一个数 first ，以 nums[i+1] 作为第二个数 second ，将 nums[nums.length - 1] 作为第三个数 last ，判断三数之和是否为 0 ，

// <0 ，则 second 往后移动一位（nums 是增序排列），继续判断
// >0 ，则 last 往前移动一位（nums 是增序排列），继续判断
// ===0 ，则进入结果数组中，并且 second 往后移动一位， last 往前移动一位，继续判断下一个元组
// 直至 second >= last 结束循环，此时， nums[i] 作为第一个数的所有满足条件的元组都已写入结果数组中了，继续遍历数组，直至 i === nums.length - 2 (后面需要有 second 、 last )

/* 输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]] */

/* 输入：nums = []
输出：[] */

/* 输入：nums = [0]
输出：[] */

const threeSum = (numArr: number[]): number[][] => {
  if (numArr.length < 3) {
    return [];
  }

  numArr.sort((a, b) => a - b);

  let result: number[][] = [];

  for (let index = 0; index < numArr.length; index++) {
    // 当前下标为 0，并且值大于 0，那后面所有的值都肯定不满足
    if (index === 0 && numArr[index] > 0) {
      break;
    }
    // 如果当前值等于上一个值 跳过当前循环 执行下一个循环
    if (index && numArr[index] === numArr[index - 1]) {
      continue;
    }

    let start = index + 1,
      end = numArr.length - 1;
    while (start < end) {
      const sum = numArr[index] + numArr[start] + numArr[end];

      if (sum === 0) {
        result.push([numArr[index], numArr[start], numArr[end]]);
        while (start < end && numArr[start] === numArr[start + 1]) {
          start++;
        }
        while (start < end && numArr[end] === numArr[end - 1]) {
          end--;
        }

        start++;
        end--;
      } else if (sum > 0) {
        end--;
      } else {
        start++;
      }
    }
  }

  return result;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1,-1,2],[-1,0,1]]
