// https://leetcode-cn.com/problems/min-stack/

/* 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
push(x) —— 将元素 x 推入栈中。
pop() —— 删除栈顶的元素。
top() —— 获取栈顶元素。
getMin() —— 检索栈中的最小元素。 */

/* 输入：
    ["MinStack","push","push","push","getMin","pop","top","getMin"]
    [[],[-2],[0],[-3],[],[],[],[]]

    输出：
    [null,null,null,null,-3,null,0,-2]

    解释：
    MinStack minStack = new MinStack();
    minStack.push(-2);
    minStack.push(0);
    minStack.push(-3);
    minStack.getMin();   --> 返回 -3.
    minStack.pop();
    minStack.top();      --> 返回 0.
    minStack.getMin();   --> 返回 -2.
 */
class MinStack {
  stack: number[];
  minStack: number[];
  constructor() {
    this.minStack = [];
    this.stack = [];
  }
  push(x: number) {
    this.stack.push(x);
    if (this.minStack.length) {
      this.minStack.push(Math.min(this.minStack.length - 1, x));
    } else {
      this.minStack.push(x);
    }
  }
  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }
  top(): number {
    return this.stack[this.stack.length - 1];
  }
  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}
