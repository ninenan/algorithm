// https://juejin.cn/book/6844733800300150797/section/6844733800367259655

const quickSort = (arr: number[]): number[] => {
    if (arr.length <= 1) return arr

    const len = arr.length
    const mid = Math.floor(len / 2)
    const pivot = arr.splice(mid, 1)[0]
    const left = []
    const right = []

    for (let index = 0; index < arr.length; index++) {
        if (arr[index] < pivot) {
            left.push(arr[index])
        } else {
            right.push(arr[index])
        }
    }

    return quickSort(left).concat([pivot], quickSort(right))
}

console.log(quickSort([8, 7, 6, 5, 4, 3, 2, 1]))

export {}