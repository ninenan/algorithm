// https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/submissions/

const reversePrint = (head: ListNode | null) => {
  let nodes = [];
  while (head !== null) {
    nodes.push(head.val);
    head = head.next;
  }
  return nodes.reverse();
};
