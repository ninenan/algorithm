// 真题描述：给定一个排序链表，删除所有含有重复数字的结点，只保留原始链表中 没有重复出现的数字。
// 输入: 1->2->3->3->4->4->5
// 输出: 1->2->5
// 示例 2:
// 输入: 1->1->1->2->3
// 输出: 2->3

const deleteDuplicatesByDummy = (head: ListNode) => {
  // 0 或 1 个节点不会重复，直接返回
  if (!head || !head.next) {
    return head;
  }

  let dummy = new ListNode();
  // dummy 永远指向头节点
  dummy.next = head;
  // cur 从 dummy 开始遍历
  let cur = dummy;
  // 当 cur 的后面至少有两个节点进行比较
  while (cur.next && cur.next.next) {
    // 对 cur 后面的两个节点进行比较
    if (cur.next.val === cur.next.next.val) {
      // 若值重复，则记下这个值
      let val = cur.next.val;
      // 反复排查后面的元素是否存在都次重复该值的情况
      while (cur.next && cur.next.val === val) {
        // 若有，则删除
        cur.next = cur.next.next;
      }
    } else {
      // 不重复，则正常遍历
      cur = cur.next;
    }
  }

  // 返回链表的起始节点
  return dummy.next;
};
