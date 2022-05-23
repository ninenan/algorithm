// 插入排序
// https://juejin.cn/book/6844733800300150797/section/6844733800367439885
// https://leetcode.cn/problems/sort-an-array/submissions/

const insertSort = (arr: number[]): number[] => {
    // 缓存数组长度
    const len = arr.length
    // temp 用来保存当前需要插入的元素
    let temp

    // index 用来标识每次被插入的元素的索引
    for (let index = 1; index < len; index++) {
        // j 用来帮助 temp 寻找自己应有的定位
        let j = index
        temp = arr[index]

        // 判断 j 前面一个元素是否比 temp 大
        while (j > 0 && arr[j - 1] > temp) {
            // 如果是 则将 j 前面的一个元素后移一位，为 temp 让出位置
            arr[j] = arr[j - 1]
            j --
        }

        // 循环让位，最后得到的 j 就是 temp的正确索引
        arr[j] = temp
    }

    return arr
}