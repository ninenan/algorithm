// https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/

/* 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

B是A的子结构， 即 A中有出现和B相同的结构和节点值。

例如:
给定的树 A:

     3
    / \
   4   5
  / \
 1   2
给定的树 B：

   4 
  /
 1
返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。
 */

/* 输入：A = [1,2,3], B = [3,1]
输出：false */

/* 输入：A = [3,4,5,1,2], B = [4,1]
输出：true */

const isSubStructure = (A: TreeNode | null, B: TreeNode | null): boolean => {
  if (!A || !B) {
    return false;
  }

  return (
    isSameTree(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
  );
};

const isSameTree = (A: TreeNode | null, B: TreeNode | null): boolean => {
  // B 子树是空子树
  if (!B) {
    return true;
  }
  // A 子树是空子树，且 B 非空，false
  if (!A) {
    return false;
  }

  // 当前节点的值不相等
  if (A.val !== B.val) {
    return false;
  }

  return isSameTree(A.left, B.left) && isSameTree(A.right, B.right);
};
