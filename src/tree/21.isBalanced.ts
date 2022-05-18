// https://juejin.cn/book/6844733800300150797/section/6844733800363065358
// https://leetcode.cn/problems/balanced-binary-tree/submissions/

const isBalanced = (root: TreeNode) => {
    // 立一个 flag，只要一个高度差绝对值大于 1，flag 则就会置为 false
    let flag = true

    // 递归遍历数据
    const dfs = (root: TreeNode): number => {
        // 如果是空树，高度为 0，如果 flag 已经为 false，没有必要继续执行下去，直接 return
        if (!root || !flag) {
            return 0
        }
        // 计算左子树的高度
        const left = root.left ? dfs(root.left) : 0
        // 计算右子树的高度
        const right = root.right ? dfs(root.right) : 0

        // 如果左右子树的高度差绝对值小于 1，flag 则置为 false
        if (Math.abs(left - right) > 1) {
            flag = false
            // 返回一个不影响回朔计算的值
            return 0
        }

        return Math.max(left, right) + 1
    }

    // 递归入口
    dfs(root)

    return flag
}

export {}