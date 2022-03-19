// https://leetcode-cn.com/problems/construct-string-from-binary-tree/submissions/

function tree2str(root: TreeNode | null): string {
  if (!root) return "";
  if (!root.left && !root.right) return "" + root.val;
  if (!root.right) {
    return `${root.val}(${tree2str(root.left)})`;
  }
  return `${root.val}(${tree2str(root.left)})(${tree2str(root.right)})`;
}
