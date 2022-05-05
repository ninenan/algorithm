// https://juejin.cn/book/6844733800300150797/section/6844733800354676744

const detectCycle = (head: any): any => {
  while (head) {
    if (head.flag) {
      return head;
    } else {
      head.flag = true;
      head = head.next;
    }
  }

  return null;
};
