// https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/

// 请完成一个函数，输入一个二叉树，该函数输出它的镜像。

/* 例如输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
镜像输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1
 */

/* 输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1] */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

const mirrorTree = (root: TreeNode | null): TreeNode | null => {
  if (root === null) {
    return null;
  }

  const left = mirrorTree(root.left);
  const right = mirrorTree(root.right);

  root.left = right;
  root.right = left;

  return root;
};
