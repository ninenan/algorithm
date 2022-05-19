const balanceBST = (root: TreeNode): TreeNode | null => {
    // 初始化中序遍历旭烈数组
    const nums: number[] = []
    // 定义中序遍历二叉树，得到有序数组
    const inorder = (root: TreeNode) => {
        if (!root) return
        inorder(root.left!)
        nums.push(root.val)
        inorder(root.right!)
    }
    const buildAVL = (low: number, high: number): null | TreeNode => {
        if (low > high) return null

        const mid = Math.floor(low + (high - low) / 2)
        const cur = new TreeNode(nums[mid])
        cur.left = buildAVL(low, mid - 1)
        cur.right = buildAVL(mid + 1, high)

        return cur
    }

    inorder(root)
    return buildAVL(0, nums.length - 1)
}