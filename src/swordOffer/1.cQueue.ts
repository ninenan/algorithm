// https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/

class CQueue {
  inStack: number[];
  outStack: number[];

  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  appendTail(val: number): void {
    this.inStack.push(val);
  }

  deleteHead(): number {
    if (!this.outStack.length) {
      while (this.inStack.length) {
        this.outStack.push(this.inStack.pop() as number);
      }
    }
    return this.outStack.pop() ?? -1;
  }
}

/* 解法 2 */
// class CQueue {
//   queueArr: number[];
//   constructor() {
//     this.queueArr = [];
//   }
//   appendTail(value: number): void {
//     this.queueArr.push(value);
//   }
//   deleteHead(): number {
//     if (this.queueArr.length) {
//       const value = this.queueArr.shift();
//       return value;
//     }
//     return -1;
//   }
// }
