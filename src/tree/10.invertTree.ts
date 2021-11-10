// https://leetcode-cn.com/problems/invert-binary-tree/

// 转一棵二叉树。

/* 4
/   \
2     7
/ \   / \
1   3 6   9 */

/* 4
/   \
7     2
/ \   / \
9   6 3   1 */

/* const invertTree = (root: TreeNode | null): TreeNode | null => {
  if (!root) {
    return null;
  }
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;

  return root;
}; */

const invertTree = (root: TreeNode | null): TreeNode | null => {
  if (!root) {
    return root;
  }
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const cur: TreeNode = queue.shift() as TreeNode;
    [cur.left, cur.right] = [cur.right, cur.left];

    if (cur.left) {
      queue.push(cur.left);
    }
    if (cur.right) {
      queue.push(cur.right);
    }
  }

  return root;
};
