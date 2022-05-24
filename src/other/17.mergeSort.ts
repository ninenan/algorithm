// https://juejin.cn/book/6844733800300150797/section/6844733800367259655

const mergeArr = (arr1: number[], arr2: number[]) => {
    //初始化两个指针
    let i = 0
    let j = 0

    // 初始化数组
    const res = []
    // 缓存 arr1 的 length
    const len1 = arr1.length
    // 缓存 arr2 的 length
    const len2 = arr2.length

    // 合并两个子数组
    while (i < len1 && j < len2) {
        if (arr1[i] < arr2[j]) {
            res.push(arr1[i])
            i++
        }else {
            res.push(arr2[j])
            j++
        }
    }

    // 若其中的一个子数组首先被合并完成，则直接拼接另一个数组的剩余部分
    if (i < len1) {
        return res.concat(arr1.slice(i))
    } else {
        return res.concat(arr2.slice(j))
    }
}

const mergeSort = (arr: number[]) => {
    const len = arr.length
    
    // 处理边界情况
    if (len <= 1) {
        return arr
    }
    
    // 计算分割点
    const mid = Math.floor(len / 2)
    // 递归分割左子数组，然后合并为有序数组
    const leftArr = mergeSort(arr.slice(0, mid))
    // 递归分割右子数组，然后合并为有序数组
    const rightArr = mergeSort(arr.slice(mid, len))
    // 合并两个有序数组
    arr = mergeArr(leftArr, rightArr)
    // 返回合并后的结果
    return arr
}


console.log(mergeSort([1, 2, 3, 4, 4, 6, 7, 1, 2, 10, 9, 4]))