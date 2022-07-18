// https://leetcode.cn/problems/qIsx9U/submissions/

class MovingAverage {
  size: number;
  cacheArr: number[];

  constructor(size: number) {
    this.size = size;
    this.cacheArr = [];
  }

  next(val: number): number {
    if (this.cacheArr.length === this.size) {
      this.cacheArr.shift();
    }

    this.cacheArr.push(val);

    let count = this.cacheArr.reduce((pre, cur) => {
      pre += cur;
      return pre;
    }, 0)

    return count / this.cacheArr.length;
  }
}
