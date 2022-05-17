// https://juejin.cn/book/6844733800300150797/section/6844733800363065351

type newTreeNode = TreeNode | null

const sortedArrayToBST = (nums: number[]): newTreeNode => {
    // 处理边界条件
    if (!nums.length) {
        return null
    }

    // 定义二叉树构建函数，入参是子序列的索引范围
    const buildBST = (min: number, max: number): newTreeNode => {
        // 当 min > max，表示已经全部处理完成
        if (min > max) return null
        // 二分 获取中间节点
        const mid = Math.floor(min + (max - min) / 2)
        // 将中间元素作为根节点
        const cur = new TreeNode(nums[mid])
        // 递归构建左子树
        cur.left = buildBST(min, mid - 1)
        // 递归构建右子树
        cur.right = buildBST(mid + 1, max)
        // 返回当前节点
        return cur
    }

    // root 节点就是递归出来的结果
    const root = buildBST(0, nums.length - 1)
    // 返回根节点
    return root
}