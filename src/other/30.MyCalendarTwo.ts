// https://leetcode.cn/problems/my-calendar-ii/

class MyCalendarTwo {
  books: number[][];
  overlaps: number[][];

  constructor() {
    this.books = [];
    this.overlaps = [];
  }

  book(start: number, end: number): boolean {
    for (const arr of this.overlaps) {
      let l = arr[0];
      let r = arr[1];
      
      if (l < end && start < r) {
        return false;
      }
    }

    for (const arr of this.books) {
      let l = arr[0];
      let r = arr[1];

      if (l < end && start < r) {
        this.overlaps.push([Math.max(l, start), Math.min(r, end)]);
      }
    }

    this.books.push([start, end]);
    return true;
  }
}
