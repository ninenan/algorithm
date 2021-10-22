// https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/

/* 请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

    1
   / \
  2   2
 / \ / \
3  4 4  3
但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

    1
   / \
  2   2
   \   \
   3    3
 */

/* 输入：root = [1,2,2,3,4,4,3]
输出：true */

/* 输入：root = [1,2,2,null,3,null,3]
输出：false */

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

const isSymmetric = (root: TreeNode | null): boolean => {
  return check(root, root);
};

const check = (
  leftRoot: TreeNode | null,
  rightRoot: TreeNode | null
): boolean => {
  if (!leftRoot && !rightRoot) {
    return true;
  }
  if (!leftRoot || !rightRoot) {
    return false;
  }

  return (
    leftRoot.val === rightRoot.val &&
    check(leftRoot.left, rightRoot.right) &&
    check(leftRoot.right, rightRoot.left)
  );
};
