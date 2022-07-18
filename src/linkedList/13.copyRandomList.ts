// https://leetcode.cn/problems/copy-list-with-random-pointer/

class ListNode {
  val: number;
  next: ListNode | null;
  random: ListNode | null
  constructor(val?: number, next?: ListNode | null, random?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random
  }
}

const copyRandomList = (head: ListNode | null): ListNode | null => {
  // 边界情况
  if (!head) {
    return null;
  }

  // 初始化 copy 头部节点
  let copyHead = new ListNode();
  // 初始化 copy 的游标节点
  let copyNode = copyHead;
  // 初始化 cacheMap
  const cacheMap = new Map();
  let curr: ListNode | null = head;

  while(curr) {
    copyNode.val = curr.val;
    copyNode.next = curr.next ? new ListNode() : null;
    cacheMap.set(curr, copyNode);
    curr = curr.next;
    copyNode = copyNode.next as ListNode;
  }

  curr = head;
  // 将 copy 链表的游标复位到 copyHead
  copyNode = copyHead;

  while(curr) {
    // 处理 random 的指向
    copyNode.random = curr.random ? cacheMap.get(curr.random) : null;
    // copyNode 和 curr 两个游标同时前进
    copyNode = copyNode.next as ListNode;
    curr = curr.next;
  }

  return copyHead;
}
