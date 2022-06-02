// https://leetcode.cn/problems/er-cha-sou-suo-shu-de-zui-jin-gong-gong-zu-xian-lcof/

// 迭代
const lowestCommonAncestor = (root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null  => {
  let node = root
  if (!p || !q || !root) return null
  while(node) {
    if (p?.val > node.val && q?.val > node.val) {
      node = node.right
    } else if (p?.val < node?.val && q?.val < node?.val) {
      node = node?.left
    } else {
      return node
    }
  }
};

// 递归
const lowestCommonAncestor2 = (root: TreeNode | null, p: TreeNode | null, q: TreeNode | null):TreeNode | null => {
  if (!p || !q || !root) return null
  if (q?.val > root?.val && p?.val > root?.val) {
    return lowestCommonAncestor2(root?.right, p, q)
  }
  if (q?.val < root?.val && p?.val < root?.val) {
    return lowestCommonAncestor2(root?.left, p, q)
  }
  return root
}

export {}