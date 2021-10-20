// https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/

// 从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

// 例如: 给定二叉树: [3,9,20,null,null,15,7],

/*    3
    / \
    9  20
    /  \
    15   7 */
// [3,9,20,15,7]

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

const levelOrder = (root: any): number[] => {
  if (!root) return [];
  const queue = [root];
  let result: number[] = [];

  while (queue.length) {
    // 获取根节点，根节点出队
    const top = queue.shift();
    // 访问队列头节点
    result.push(top.val);

    top.left && queue.push(top.left);
    top.right && queue.push(top.right);
  }

  return result;
};
