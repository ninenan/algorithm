// https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof/

const maxDepth = (root: TreeNode | null): number => {
  if (root === null) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

const maxDepth1 = (root: TreeNode | null): number => {
  if (root === null) return 0;
  let queue = [],
    res = 0;
  queue.push(root);

  while (queue.length) {
    let len = queue.length;

    for (let index = 0; index < len; index++) {
      let node = queue.shift();

      if (node?.left) queue.push(node.left);
      if (node?.right) queue.push(node.right);
    }
    res += 1;
  }

  return res;
};
