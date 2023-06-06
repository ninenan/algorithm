// AllCombinations<StringTypes>
// 获取字符串的所有可能的排列

type StringToUnion<S extends string> = S extends `${infer R}${infer U}`
  ? R | StringToUnion<U>
  : never;

type Combination<S extends string, U extends string = "", K = S> = [S] extends [
  never
]
  ? U
  : K extends S
  ? Combination<Exclude<S, K>, U | `${U}${K}`>
  : U;

type AllCombinations<S extends string> = Combination<StringToUnion<S>>;

// T1 = '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
type T1 = AllCombinations<"ABC">;

export {};
