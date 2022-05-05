// https://juejin.cn/book/6844733800300150797/section/6844733800354676744

const hasCycle = (head: any): boolean => {
  // 只要节点存在就继续遍历
  while (head) {
    // 如果 flag 已经立过了，则说明环存在
    if (head.flag) {
      return true;
    } else {
      // 如果 flag 为 false，就立一个 flag
      head.flag = true;
      head = head.next;
    }
  }

  return false;
};
