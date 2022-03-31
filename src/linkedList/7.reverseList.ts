// https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/submissions/

const reverseList = (head: ListNode | null): ListNode | null => {
  let res = null,
    cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = res;
    res = cur;
    cur = next;
  }
  return res;
};
