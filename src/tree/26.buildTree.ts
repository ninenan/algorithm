// https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/

const buildTree = (preorder: number[], inorder: number[]): TreeNode | null => {
  const len = preorder.length;

  const build = (preL: number, preR: number, inL: number, inR: number): TreeNode | null => {
    // 边界情况
    if (preL > preR) {
      return null;
    }

    // 初始化目标节点
    const root = new TreeNode();
    // 目标节点映射的是当前前序遍历序列的头部节点
    root.val = preorder[preL];
    // 获取根节点在中序遍历中的位置
    const k = inorder.indexOf(root.val);
    const numLeft = k - inL;
    // 构造左子树
    root.left = build(preL + 1, preL + numLeft, inL, k - 1);
    // 构造右子树
    root.right = build(preL + numLeft + 1, preR, k + 1, inR);
    // 返回当前节点
    return root;
  }
  
  return build(0, len - 1, 0, len - 1);
}

export {}
