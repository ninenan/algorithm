// https://leetcode.cn/problems/sort-an-array/

// 最好的方案还是这个
const sortArray = (arr: number[]): number[] => {
    return arr.sort((a, b) => a - b)
}

// 会超出执行耗时
const sortArray2 = (arr: number[]):number[] => {
    const len = arr.length
        
    for (let index = 0; index < len; index++) {
        for (let k = 0; k < len - 1; k++) {
            if (arr[k] > arr[k + 1]) {
                [arr[k], arr[k + 1]] = [arr[k + 1], arr[k]]
            }
        }
    }

    return arr
}


// 内存空间优化友好
const sortArray3 = (arr: number[]):number[] => {
    const len = arr.length

    for (let index = 0; index < len; index++) {
        for (let k = 0; k < len - 1 - index; k++) {
            if (arr[k] > arr[k + 1]) {
                [arr[k], arr[k + 1]] = [arr[k + 1], arr[k]]
            }
        }
    }

    return arr
}

const sortArray4 = (arr: number[]): number[] => {
    const len = arr.length
    
    for (let index = 0; index < len; index++) {
        let flag = false
        for (let k = 0; k < len - k - index; k++) {
            if (arr[k] > arr[k + 1]) {
                [arr[k], arr[k + 1]] = [arr[k + 1], arr[k]]
                flag = true
            }
        }
        if (!flag) return arr
    }

    return arr
}