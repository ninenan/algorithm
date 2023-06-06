type IsAny<T> = 0 extends 1 & T ? true : false;
type NotAny<T> = IsAny<T> extends true ? false : true;

// false
type T1 = IsAny<undefined>;
// false
type T2 = IsAny<never>;
// true
type T3 = IsAny<any>;

// false
type T4 = NotAny<any>;
// true
type T5 = NotAny<string>;
// true
type T6 = NotAny<never>;
// true
type T7 = NotAny<unknown>;
