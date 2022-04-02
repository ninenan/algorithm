// 输入: 1->1->2
// 输出: 1->2
// 示例 2:
// 输入: 1->1->2->3->3
// 输出: 1->2->3

const deleteDuplicates = (head: ListNode) => {
  // 设定 cur 指针，初始位置是链表的第一个节点
  let cur = head;
  // 遍历链表
  while (cur !== null && cur.next !== null) {
    // 多当前的节点和它后面一个节点值相同
    if (cur.val === cur.next.val) {
      // 删除后面的那个节点
      cur.next = cur.next.next;
    } else {
      // 若不相同，继续遍历
      cur = cur.next;
    }
  }

  return head;
};
