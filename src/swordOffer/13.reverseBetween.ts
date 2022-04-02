// https://leetcode-cn.com/problems/reverse-linked-list-ii/

const reverseBetween = (head: ListNode, m: number, n: number) => {
  let pre, cur, leftHead;

  const dummy = new ListNode();

  dummy.next = head;
  let p = dummy;
  for (let index = 0; index < m - 1; index++) {
    p = p.next;
  }

  leftHead = p;
  let start = leftHead.next;
  pre = start;
  cur = pre?.next;

  for (let index = 0; index < n; index++) {
    let next = cur?.next;
    cur?.next = pre;
    pre = cur;
    cur = next;
  }

  leftHead.next = pre;
  start?.next = cur;
  return dummy.next;
};
