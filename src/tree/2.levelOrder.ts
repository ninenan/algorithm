// https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/

/* 从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。
例如:
给定二叉树: [3,9,20,null,null,15,7], */

/*   3
    / \
    9  20
    /  \
    15   7 */

/* 返回其层次遍历结果：
[
  [3],
  [9,20],
  [15,7]
] */

/* *
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

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// 广度优先遍历
const levelOrder2 = (root: TreeNode | null): number[][] => {
  let result: number[][] = [];

  if (!root) {
    return result;
  }

  const queue = [];
  queue.push(root);

  while (queue.length !== 0) {
    const currentLevelSize = queue.length;
    result.push([]);
    for (let index = 0; index < currentLevelSize; index++) {
      const node = queue.shift() as TreeNode;
      result[result.length - 1].push(node?.val);
      if (node?.left) {
        queue.push(node.left);
      }
      if (node?.right) {
        queue.push(node.right);
      }
    }
  }

  return result;
};
