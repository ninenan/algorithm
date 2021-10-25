// https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/

/* 输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。
例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。 */

/* 给定一个链表: 1->2->3->4->5, 和 k = 2.
返回链表 4->5. */

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

const getKthFromEnd = (head: ListNode | null, k: number): ListNode | null => {
  let result: ListNode | null = head,
    n = 0;
  while (result) {
    result = result.next;
    n++;
  }
  result = head;
  for (let index = 0; index < n - k; index++) {
    result = result?.next as ListNode | null;
  }

  return result;
};
