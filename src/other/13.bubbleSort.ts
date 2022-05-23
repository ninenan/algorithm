// 冒泡排序
// https://juejin.cn/book/6844733800300150797/section/6844733800367439885
// https://leetcode.cn/problems/sort-an-array/submissions/

const bubbleSort = (arr: number[]): number[] => {
    const len = arr.length

    for (let index = 0; index < len; index++) {
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }

    return arr
}

console.log(bubbleSort([1,2,1,2,3,123,2,32,13,1])) // [ 1, 1, 1, 2, 2, 2, 3, 13, 32, 123 ]

// 优化1
const bubbleSort2 = (arr: number[]): number[] => {
    const len = arr.length

    for (let index = 0; index < len; index++) {
        // 优化点 已经排好序的不会再去操作
        for (let j = 0; j < len - 1 - index; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }

    return arr
}

// 最终方案
const bubbleSort3 = (arr: number[]): number[] => {
    const len = arr.length

    for (let index = 0; index < len; index++) {
        // 增加标识位
        let flag = false
        for (let j = 0; j < len - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                // 只要发生了一次交换，就修改标志位
                flag = true
            }
        }
        // 若一次交换都没有发生，则说明数组有序，直接放过
        if (!flag) return arr
    }

    return arr
}
export {}