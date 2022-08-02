// Pop<Types>
// 函数接受 Array T 并返回一个 Array，但不包含它的最后一个元素。

type Pop<T extends any[]> = T extends [] 
  ? [] 
  : T extends [...infer U, infer R] 
  ? U 
  : never;

const arr:Pop<[1, 2, 3]> = [1, 2];
const arr1:Pop<[]> = [];

export {}
