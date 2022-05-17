// https://leetcode-cn.com/problems/validate-binary-search-tree/

/* 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
有效 二叉搜索树定义如下：
节点的左子树只包含 小于 当前节点的数。
节点的右子树只包含 大于 当前节点的数。
所有左子树和右子树自身必须也是二叉搜索树。 */

/* 输入：root = [2,1,3]
输出：true */

/* 输入：root = [5,1,4,null,null,3,6]
输出：false
解释：根节点的值是 5 ，但是右子节点的值是 4 。 */

const isValidBST = (root: TreeNode | null): boolean => {
  let stack: TreeNode[] = [];
  let inorder = -Infinity;

  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop() as TreeNode;
    if (root?.val <= inorder) {
      return false;
    }
    inorder = root.val;
    root = root.right;
  }

  return true;
};

/**
 * 思想：左 < 根 < 右的比较方式
 * 1. 可以是一棵空树
 * 2. 可以是一棵由根节点、左子树、右子树组成的树，同时左子树和右子树都是二叉搜索树，并且左子树的所有节点的数据都小于等于根节点的数据
 *    右子树所有及诶单的数据都大于等于根节点的数据
 * @param {TreeNode} root 
 * @returns {boolean}
 */
const isValidBST2 = (root: TreeNode | null): boolean => {
  const dfs = (root: TreeNode | null, minVal: number, maxVal: number): boolean => {
    if (!root) return true

    if (root.val <= minVal || root.val >= maxVal) return false
    return dfs(root.left, minVal, root.val) && dfs(root.right, root.val, maxVal)
  }
  return dfs(root, -Infinity, Infinity)
}

export {}