// https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof/

const mergeTwoLists = (
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null => {
  if (!l1) return l2;
  if (!l2) return l1;

  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};

export {};
