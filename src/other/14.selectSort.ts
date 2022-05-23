// 选择排序
// https://juejin.cn/book/6844733800300150797/section/6844733800367439885
// https://leetcode.cn/problems/sort-an-array/submissions/

const selectSort = (arr: number[]): number[] => {
    // 缓存数组长度
    const len = arr.length
    // 定义最小值索引
    let minIndex = -1

    for (let index = 0; index < len - 1; index++) {
        // 定义 minIndex 为第一个元素
        minIndex = index

        for (let j = index; j < len; j++) {
            // 若 j 处的数据小于 minIndex的额数据 则更新最小值的索引
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        
        // 如果 minIndex 对应的元素不是目前头部的元素，则交换两者
        if (minIndex !== index) {
            [arr[index], arr[minIndex]] = [arr[minIndex], arr[index]]
        }
    }

    return arr
}