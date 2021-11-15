// https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/

/* 给定一个二叉树，找出其最小深度。
最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
说明：叶子节点是指没有子节点的节点。 */

/* 输入：root = [3,9,20,null,null,15,7]
输出：2 */

/* 输入：root = [2,null,3,null,4,null,5,null,6]
输出：5 */

const minDepth = (root: TreeNode | null): number => {
  if (!root) {
    return 0;
  }
  if (root.left === null && root.right === null) {
    return 1;
  }

  let ans = Number.MAX_SAFE_INTEGER;
  if (root.left) {
    ans = Math.min(minDepth(root.left), ans);
  }
  if (root.right) {
    ans = Math.min(minDepth(root.right), ans);
  }

  return ans + 1;
};
