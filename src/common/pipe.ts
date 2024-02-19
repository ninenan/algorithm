export const pipe = (...funcs: any[]) => {
  function callback(input: any[], func: any) {
    return func(input);
  }

  return function (param: any) {
    return funcs.reduce(callback, param);
  };
};

export const compose = (...funcs: any[]) => {
  function callback(input: any[], func: any) {
    return func(input);
  }

  return function (param: any) {
    return funcs.reduceRight(callback, param);
  };
};

// test demo
export const compose1 =
  (...funcs: Function[]) =>
  (initialVal: any) =>
    funcs.reduceRight((prev, cur) => cur(prev), initialVal);

function add4(num: number) {
  return num + 4;
}

function multiply3(num: number) {
  return num * 3;
}

function divide2(num: number) {
  return num / 2;
}

const compute = pipe(add4, multiply3, divide2);
const computeCompose = compose(divide2, multiply3, add4);
const computeCompose1 = compose1(divide2, multiply3, add4);

console.log(compute(10)); // 21
console.log(computeCompose(10)); // 21
console.log(computeCompose1(10)); // 21
