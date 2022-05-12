// https://leetcode-cn.com/problems/binary-tree-preorder-traversal/

// 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。

/* 输入：root = [1,null,2,3]
输出：[1,2,3] */

/* 输入：root = []
输出：[] */

/* 输入：root = [1]
输出：[1] */

/* 输入：root = [1,null,2]
输出：[1,2] */

/**
 * @param root
 * 根-左-右
 * @returns
 */
const preOrder = (root: TreeNode) => {
  // 递归边界 root 为空
  if (!root) {
    return;
  }

  // 输出当前遍历的结点值
  console.log("当前遍历的结点值是：", root.val);
  // 递归遍历左子树
  preOrder(root.left as TreeNode);
  // 递归遍历右子树
  preOrder(root.right as TreeNode);
};

const preorderTraversal = (root: TreeNode | null): number[] => {
  let res: number[] = [];
  if (!root) {
    return res;
  }

  const dfs = (root: TreeNode | null) => {
    if (!root) {
      return;
    }
    res.push(root.val);
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);

  return res;
};

// 先序遍历（先根节点->左节点->右节点） 
// 具体代码实现（右-左-根）
const preorderTraversal2 = (root: TreeNode | null): number[] => {
  const res: number[] = []

  if (!root) return res

  const stack = []
  stack.push(root)

  while (stack.length) {
    const cur = stack.pop()
    if (cur?.val) {
      res.push(cur.val)
    }
    if (cur?.right) {
      stack.push(cur.right)
    }
    if (cur?.left) {
      stack.push(cur.left)
    }
  }

  return res
}