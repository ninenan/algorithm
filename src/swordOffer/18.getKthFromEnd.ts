// https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/

const getKthFromEnd = (head: ListNode | null, k: number): ListNode | null => {
  let res: ListNode | null = head,
    num = 0;
  while (res) {
    res = res.next;
    num++;
  }

  for (let index = 0; index < num - k; index++) {
    res = res?.next as ListNode | null;
  }

  return res;
};

const getKthFromEnd2 = (head: ListNode | null, k: number): ListNode | null => {
  let fast = head,
    slow = head;

  while (fast && k > 0) {
    [fast, k] = [fast.next, k - 1];
  }

  while (fast) {
    [fast, slow] = [fast.next, slow?.next as null];
  }
  return slow;
};

export {};
