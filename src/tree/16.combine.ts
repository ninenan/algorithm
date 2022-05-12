// https://leetcode.cn/problems/combinations/

const combine = (n: number, k: number): number[][] => {
    // 初始化结果数组
    const res: number[][] = []
    // 初始化组合数组
    const subset: number[] = []
    const dfs = (index: number) => {
        if (subset.length === k) {
            res.push(subset.slice())
            return
        }
        for (let i = index; i <= n; i++) {
            subset.push(i)
            dfs(i + 1)
            subset.pop()
        }
    }

    // 进入 dfs
    dfs(1)

    return res
}

console.log(combine(4, 2)) // [ [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 3 ], [ 2, 4 ], [ 3, 4 ] ]