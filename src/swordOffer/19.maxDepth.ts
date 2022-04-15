// https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/

const maxDepth = (root: TreeNode | null): number => {
  if (root === null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};
