// https://leetcode.cn/problems/design-circular-queue/

class MyCircularQueue {
  data: number[];
  front: number;
  rear: number;
  constructor(k: number) {
    this.data = new Array<number>(k + 1).fill(-1);
    this.front = 0;
    this.rear = 0;
  }

  enQueue(value: number): boolean {
    if (this.isFull()) {
      return false;
    }
    this.data[this.rear] = value;
    this.rear = this.nxt(this.rear);

    return true;
  }

  deQueue(): boolean {
    if (this.isEmpty()) {
      return false;
    }
    this.front = this.nxt(this.front);

    return true;
  }

  Front(): number {
    return this.isEmpty() ? -1 : this.data[this.front];
  }

  Rear(): number {
    return this.isEmpty()
      ? -1
      : this.data[(this.rear + this.data.length - 1) % this.data.length];
  }

  isEmpty(): boolean {
    return this.rear == this.front;
  }

  isFull(): boolean {
    return this.nxt(this.rear) == this.front;
  }

  nxt(cur: number): number {
    return (cur + 1) % this.data.length;
  }
  getQueue() {
    return this.data;
  }
}
