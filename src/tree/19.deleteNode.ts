// https://leetcode.cn/problems/delete-node-in-a-bst/
// https://juejin.cn/book/6844733800300150797/section/6844733800363065351

const deleteNode = (root: TreeNode | null, n: number) => {
    if (!root) return root

    if (root.val === n) {
        if (!root.left && !root.right) {
            root = null
        } else if (root.left) {
            const maxLeft = findMax(root.left)
            root.val = maxLeft.val
            root.left = deleteNode(root.left, maxLeft.val)
        } else if (root.right){
            const minRight = findMin(root.right)
            root.val = minRight.val
            root.right = deleteNode(root.right, minRight.val)
        }
    } else if (root.val > n) {
        root.left = deleteNode(root.left, n)
    } else {
        root.right = deleteNode(root.right, n)
    }

    return root
} 

// 寻找左子树的最大值
const findMax = (root: TreeNode) => {
    while(root.right) {
        root = root.right
    }

    return root
}

// 寻找右子树的最小值
const findMin = (root: TreeNode) => {
    while(root.left) {
        root = root.left
    }

    return root
}