// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/

// 给定一个二叉树的根节点 root ，返回它的 中序 遍历。

/* 输入：root = [1,null,2,3]
输出：[1,3,2] */

/* 输入：root = []
输出：[] */

/* 输入：root = [1]
输出：[1] */

/* 输入：root = [1,2]
输出：[2,1] */

/* 输入：root = [1,null,2]
输出：[1,2] */

/**
 * 中序遍历
 * 左-根-右
 * @param root
 */
const inOrder = (root: TreeNode) => {
  // 递归边界 root 为空
  if (!root) {
    return;
  }
  // 递归便利左子树
  inOrder(root.left as TreeNode);
  // 输出当前遍历的结点值
  console.log("当前遍历的结点值是：", root.val);
  // 递归便利右子树
  inOrder(root.right as TreeNode);
};

const inOrderTraversal = (root: TreeNode | null): number[] => {
  let res: number[] = [];
  if (!root) {
    return res;
  }

  const inOrder = (root: TreeNode | null) => {
    if (!root) {
      return;
    }
    inOrder(root.left);
    res.push(root.val);
    inOrder(root.right);
  };
  inOrder(root);

  return res;
};
