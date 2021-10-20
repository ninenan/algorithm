// https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/

/* 请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。
例如:
给定二叉树: [3,9,20,null,null,15,7],*/

/*   
     3
    / \
    9  20
    /  \
    15   7
*/

/* 返回其层次遍历结果：
    [
        [3],
        [20,9],
        [15,7]
    ] */

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

const levelOrder3 = (root: TreeNode | null): number[][] => {
  let result: number[][] = [];

  if (!root) return result;
  const queue: [TreeNode | null, number][] = [[root, 0]];

  while (queue.length) {
    const [node, lev] = queue.shift() as [TreeNode, number];

    if (!result[lev]) {
      result[lev] = [];
    }

    lev & 1 ? result[lev].unshift(node.val) : result[lev].push(node.val);

    node.left && queue.push([node.left, lev + 1]);
    node.right && queue.push([node.right, lev + 1]);
  }
  return result;
};
