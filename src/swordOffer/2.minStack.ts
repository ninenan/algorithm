// https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/

class MinStack {
  stack: number[];
  minStack: number[];
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(val: number): void {
    this.stack.push(val);
    const len = this.minStack.length;

    if (len) {
      this.minStack.push(Math.min(this.minStack[len - 1], val));
    } else {
      this.minStack.push(val);
    }
  }
  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }
  top(): number {
    return this.stack[this.stack.length - 1];
  }
  min(): number {
    return this.minStack[this.minStack.length - 1];
  }
}

export {};
