// https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/

const deleteNode1 = (head: ListNode | null, val: number): ListNode | null => {
  const res = new ListNode(-1);
  res.next = head;
  let p: ListNode | null = res;

  while (p?.next) {
    if (p.next.val === val) {
      p.next = p.next.next;
    }
    p = p.next;
  }

  return res.next;
};
