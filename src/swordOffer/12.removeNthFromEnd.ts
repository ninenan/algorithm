// 真题描述：给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

// 给定一个链表: 1->2->3->4->5, 和 n = 2.
// 当删除了倒数第二个结点后，链表变为 1->2->3->5.

const removeNthFromEnd = (head: ListNode, num: number) => {
  const dummy = new ListNode();
  dummy.next = head;

  let fast = dummy;
  let slow = dummy;

  while (num) {
    fast = fast.next as ListNode;
    num--;
  }

  while (fast.next) {
    fast = fast.next;
    slow = slow.next as ListNode;
  }

  slow.next = slow.next?.next;

  return dummy.next;
};
