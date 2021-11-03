// 主要练习高频题目 算法快慢指针

// https://leetcode-cn.com/problems/shan-chu-lian-biao-de-jie-dian-lcof/

/* 给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
返回删除后的链表的头节点。
注意：此题对比原题有改动 */

/* 输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9. */

/* 输入: head = [4,5,1,9], val = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9. */

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
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const deleteNode = (head: ListNode | null, val: number): ListNode | null => {
  const result = new ListNode(-1);
  result.next = head;
  let p: ListNode | null = result;
  while (p?.next) {
    if (p.next.val === val) {
      p.next = p.next.next;
    }
    p = p.next;
  }

  return result.next;
};
