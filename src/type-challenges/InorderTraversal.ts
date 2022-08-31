// InorderTraversal<Types>
// 实现二叉树无序遍历的类型版本。

interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

type InOrderTraversal<
  T extends TreeNode | null,
  U extends TreeNode = NonNullable<T>
> = T extends TreeNode ? [...InOrderTraversal<U['left']>, U['val'], ...InOrderTraversal<U['right']>] : [];

const tree1 = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
} as const

// T1 = [1, 3, 2]
type T1 = InOrderTraversal<typeof tree1>;

export {};
