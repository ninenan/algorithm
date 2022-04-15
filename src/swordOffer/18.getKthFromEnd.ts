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

export {};
