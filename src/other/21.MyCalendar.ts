// https://leetcode.cn/problems/my-calendar-i/

// 暴力解
class MyCalendar {
  books: number[][]

  constructor() {
    this.books = [];
  }

  book(start: number, end: number): boolean {
    if (!this.books.length) {
      this.books.push([start, end]);
      return true;
    }

    for (let index = 0; index < this.books.length; index++) {
      let l = this.books[index][0];
      let r = this.books[index][1];
      if (l < end && start < r) {
        return false;
      }
    }
    this.books.push([start, end]);
    return true;
  }
}

// 二分
class MyCalendar2 {
  books: number[][];

  constructor() {
    this.books = [];
  }

  book(start: number, end: number): boolean {
    const books = this.books;

    if (books.length) {
      let left = 0;
      let right = books.length;

      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const [s, e] = books[mid];

        if (start >= e) {
          left = mid + 1;
        } else if (end <= s) {
          right = mid;
        } else {
          return false;
        }
      }

      books.splice(left, 0, [start, end]);
      return true
    }
    books.push([start, end]);
    return true;
  }
}

