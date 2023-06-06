type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

const T1: IsEqual<1, 2> = false;
const T2: IsEqual<1, 1> = true;
const T3: IsEqual<"1", 1> = false;
const T4: IsEqual<string, string> = true;

export {};
