const permute = (nums: number[]): number[][] => {
    const len = nums.length
    const cur: number[] = []
    const res: number[][] = []
    const visited: any = {}

    const dfs = (nth: number) => {
        if (nth === len) {
            res.push(cur.slice())
            return
        }
        for (let index = 0; index < len; index++) {
            if (!visited[nums[index]]) {
                visited[nums[index]] = 1
                cur.push(nums[index])
                dfs(nth + 1)
                cur.pop()
                visited[nums[index]] = 0
            }
        }
    }

    dfs(0)
    return res
}

console.log(permute([1, 2, 3]))