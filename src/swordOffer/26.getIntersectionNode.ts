class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

const getIntersectionNode = (headA: ListNode, headB: ListNode): null | ListNode => {
  if (headA === null || headB === null) return null

  const visited = new Set()
  let temp: ListNode | null = headA

  while (temp) {
    visited.add(temp)
    temp = temp.next
  }

  temp = headB
  while(temp){ 
    if(visited.has(temp)) {
      return temp
    }
    temp = temp.next
  }

  return null
}

const getIntersectionNode1 = (headA: ListNode, headB: ListNode): null | ListNode => {
  if (headA === null || headB === null) return null

  let tempA = headA
  let tempB = headB

  while(tempA !== tempB) {
    tempA = tempA === null ? headB : tempA.next as ListNode
    tempB = tempB === null ? headA : tempB.next as ListNode
  }

  return tempA
}

export {}