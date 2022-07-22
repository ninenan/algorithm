// Pop<Types>

type Pop<T extends any[]> = T extends [] 
  ? [] 
  : T extends [...infer U, infer R] 
  ? U 
  : never;

const arr:Pop<[1, 2, 3]> = [1, 2];
const arr1:Pop<[]> = [];

export {}
