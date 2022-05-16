// https://juejin.cn/book/6844733800300150797/section/6844733800363065351
// 查找数据域为某一特定值的结点

// 思路
/*
 * 假设这个目标结点的数据域值为 n，我们借助二叉搜索树数据域的有序性，可以有以下查找思路：
 * 递归遍历二叉树，若当前遍历到的结点为空，就意味着没找到目标结点，直接返回。
 * 若当前遍历到的结点对应的数据域值刚好等于n，则查找成功，返回。
 * 若当前遍历到的结点对应的数据域值大于目标值n，则应该在左子树里进一步查找，设置下一步的遍历范围为 root.left 后，继续递归。
 * 若当前遍历到的结点对应的数据域值小于目标值n，则应该在右子树里进一步查找，设置下一步的遍历范围为 root.right 后，继续递归。
 */

const search2 = (root:TreeNode | null, n: number): TreeNode | undefined => {
    if (!root) return

    if (root.val === n) return root

    if (root.val > n) {
        search2(root.left, n)
    }
    if (root.val < n) {
        search2(root.right, n)
    }
}