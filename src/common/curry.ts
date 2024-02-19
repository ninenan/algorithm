//////////////////////////////////////////////////// 01
function curry01First(f: Function) {
  // curry(f) 执行柯里化转换
  return function (a: any) {
    return function (b: any) {
      return f(a, b);
    };
  };
}

// 用法
function sum(a: number, b: number) {
  return a + b;
}

let curriedSum = curry01First(sum);

console.log(curriedSum(1)(2)); // 3

function curry01Last(func: Function) {
  return function curried(...args: any[]) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    return function (...args2: any[]) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

//////////////////////////////////////////////////// 02
// 借助 Function.length 读取函数元数
export const curry = (func: Function, arity = func.length) => {
  // 定义递归式 generateCurried
  function generateCurried(prevArgs: any) {
    // generateCurried 函数必定返回一层嵌套
    return function curried(nextArgs: any) {
      // 统计目前“已记忆”+“未记忆”的参数
      const args = [...prevArgs, nextArgs];
      // 若 “已记忆”+“未记忆”的参数数量 >= 回调函数元数，则认为已经记忆了所有的参数
      if (args.length >= arity) {
        return func(...args);
      } else {
        // 未触碰递归边界，则递归调用 generateCurried 自身，创造新一层的嵌套
        return generateCurried(args);
      }
    };
  }

  // 调用 generateCurried，起始传参为空数组，表示“目前还没有记住任何参数”
  return generateCurried([]);
};

const pipe = (...funcs: any[]) => {
  function callback(input: any[], func: any) {
    return func(input);
  }

  return function (params: any) {
    return funcs.reduce(callback, params);
  };
};

// test demo
function add(a: number, b: number) {
  return a + b;
}

function multiply(a: number, b: number, c: number) {
  return a * b * c;
}

function addMore(a: number, b: number, c: number, d: number) {
  return a + b + c + d;
}

function divide(a: number, b: number) {
  return a / b;
}

const curriedAdd = curry(add);
const curriedMultiply = curry(multiply);
const curriedAddMore = curry(addMore);
const curriedDivide = curry(divide);

const compute = pipe(
  curriedAdd(1),
  curriedMultiply(2)(3),
  curriedAddMore(1)(2)(3), // 每次只能传一个参数
  curriedDivide(300),
);

const compute02 = pipe(
  curry01Last(add)(1),
  curry01Last(multiply)(2, 3),
  curry01Last(addMore)(1, 2)(3),
  curry01Last(divide)(300),
);

console.log(compute(3)); // 10
console.log(compute02(8)); // 5
