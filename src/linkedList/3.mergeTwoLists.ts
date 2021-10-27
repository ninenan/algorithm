// https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/

// 输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

/* 输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4 */

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

const mergeTwoLists = (
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null => {
  if (!l1) {
    return l2;
  }
  if (!l2) {
    return l1;
  }
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
