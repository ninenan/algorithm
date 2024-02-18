export const produce = (base: any, recipe: any) => {
  // 预定义一个 copy 副本
  let copy: any;

  // 定义 base 对象的 proxy handler
  const baseHandler = {
    set(obj: any, key: any, value: any) {
      // 判断 copy 是否存在，不存在，则创建
      if (!copy) {
        copy = { ...base };
      }
      // 存在，则修改 copy
      copy[key] = value;
      return true;
    },
  };

  // 使用 proxy 包装 base
  const draft = new Proxy(base, baseHandler);

  // 将 draft 作为入参传入 recipe
  recipe(draft);

  // 返回一个被冻结的 copy，如果 copy 不存在，则表示没有执行写操作，返回 base
  // 冻结：避免意外的修改发生，进一步保证数据的纯度
  return Object.freeze(copy || base);
};

// 测试验证代码
const baseObj = {
  a: 1,
  b: {
    name: "nnn",
  },
};

const changeA = (draft: any) => (draft.a = 2);

const doNothing = (draft: any) => {
  console.log("doNothing", draft);
};

const A = produce(baseObj, changeA);
const B = produce(baseObj, doNothing);
console.log(baseObj); // { a: 1, b: { name: 'nnn' } }
console.log(A); // { a: 2, b: { name: 'nnn' } }
console.log(B); // { a: 1, b: { name: 'nnn' } }

// 【源对象】和【借助 produce 对源对象执行过写操作后的对象】还是同一个对象吗？
console.log(baseObj === A); // false
// 【源对象】和【借助 produce 对源对象执行过读操作后的对象】还是同一个对象吗？
console.log(baseObj === B); // true
// 源对象里没有被执行写操作的 b 属性，在 produce 执行前后是否会发生变化？
console.log(baseObj.b === A.b); // true
