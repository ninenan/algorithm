// https://juejin.cn/book/6844733800300150797/section/6844733800363065351
// https://leetcode.cn/problems/insert-into-a-binary-search-tree/

const insertIntoBST = (root: TreeNode | null, n: number) => {
    if (!root) {
        root = new TreeNode(n)
        return root
    }

    if (root.val > n) {
        root.left = insertIntoBST(root.left, n)
    } else {
        root.right = insertIntoBST(root.right, n)
    }

    return root
}