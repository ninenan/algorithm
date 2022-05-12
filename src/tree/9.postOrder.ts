// https://leetcode-cn.com/problems/binary-tree-postorder-traversal/

// 给定一个二叉树，返回它的 后序 遍历。

/* 输入: [1,null,2,3]  
输出: [3,2,1] */

/**
 * 后序遍历
 * 左-右-根
 * @param root
 */
const postOrder = (root: TreeNode) => {
  if (!root) {
    return;
  }

  // 递归遍历左子树
  postOrder(root.left as TreeNode);
  // 递归遍历右子树
  postOrder(root.right as TreeNode);
  // 输出当前遍历的结点值
  console.log("当前遍历的结点值是：", root.val);
};

const postOrderTraversal = (root: TreeNode | null): number[] => {
  let res: number[] = [];
  if (!root) {
    return res;
  }

  const postOrder = (root: TreeNode | null) => {
    if (!root) {
      return;
    }

    postOrder(root.left);
    postOrder(root.right);
    res.push(root.val);
  };
  postOrder(root);

  return res;
};

const postOrderTraversal2 = (root: TreeNode | null): number[] => {
  const res: number[] = []
  if (!root) return res

  const stack = []
  stack.push(root)

  while (stack.length) {
    const cur = stack.pop()
    if (cur?.val) {
      res.unshift(cur.val)
    }
    if (cur?.left) {
      stack.push(cur.left)
    }
    if (cur?.right) {
      stack.push(cur.right)
    }
  }

  return res
}