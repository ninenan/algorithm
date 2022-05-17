// https://leetcode.cn/problems/delete-node-in-a-bst/
// https://juejin.cn/book/6844733800300150797/section/6844733800363065351

/**
 * 1. 节点不存在，定位到了空节点，则直接返回
 * 2. 需要删除的目标接待你没有左子树和右子树---它是一个叶子节点，删除它不会对其他节点造成影响，直接删除
 * 3. 删除的节点只存在左子树---去左子树中查找小于目标节点的最大节点，然后用这个节点覆盖这个目标节点
 * 4. 删除的节点只存在右子树---去右子树中查找大雨目标节点的最小节点，然后用这个节点覆盖这个目标节点
 * 5. 删除的节点同时存在左子树和右子树（两种方法）
 *      1. 去左子树中找到小于目标节点的最大值，覆盖目标节点
 *      2. 去右子树中找到大于目标节点的最小值，覆盖目标节点
 * @param root 
 * @param n 
 * @returns 
 */

const deleteNode = (root: TreeNode | null, n: number) => {
    // 如果没找到目标节点 直接返回
    if (!root) return root

    // 找到了目标节点
    if (root.val === n) {
        // 每周左子树和右子树 直接删除
        if (!root.left && !root.right) {
            root = null
        } else if (root.left) {
            // 存在左子树
            // 找到左子树当中的最大节点
            const maxLeft = findMax(root.left)
            // 覆盖掉当前需要删除的节点
            root.val = maxLeft.val
            // 覆盖掉原有的 maxLeft 节点
            root.left = deleteNode(root.left, maxLeft.val)
        } else if (root.right){
            // 存在右子树
            // 找到右子树中最小的节点
            const minRight = findMin(root.right)
            // 覆盖掉当前需要删除的节点
            root.val = minRight.val
            // 覆盖掉原有的 minRight 节点
            root.right = deleteNode(root.right, minRight.val)
        }
    } else if (root.val > n) {
        // 如果当前节点大于目标值，遍历左子树
        root.left = deleteNode(root.left, n)
    } else {
        // 如果当前节点小于目标值，遍历右子树
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