// 流程图片: https://tlqttest.data4truth.com//group1/M00/00/13/wKgBDGFS2cuAUGw4AAM_BrZDt1A274.png
const isObject = (params: unknown): boolean => {
  return Object.prototype.toString.call(params).slice(8, -1) === "Object";
};

const reactive = (obj: object): object => {
  return new Proxy(obj, {
    get(target, key) {
      const res = Reflect.get(target, key);
      console.log("get :>> ", key);
      // 保存依赖收集
      track(target, key);

      return isObject(res) ? reactive(res) : res;
    },

    set(target, key, value) {
      const res = Reflect.set(target, key, value);
      console.log("set :>> ", key);
      trigger(target, key);

      return res;
    },

    deleteProperty(target, key) {
      const res = Reflect.deleteProperty(target, key);
      console.log("deleteProperty :>> ", key);

      return res;
    },
  });
};

// 临时保存依赖函数
let effectStack: any[] = [];

// 立刻执行 fn 并存入 effectStack
function effect(fn: any) {
  const e = createReactiveEffect(fn);

  e();

  return e;
}

function createReactiveEffect(fn: any) {
  const effect = function reactiveEffect() {
    try {
      // 入栈操作
      effectStack.push(effect);
      return fn();
    } catch (error) {
    } finally {
      effectStack.pop();
    }
  };

  return effect;
}

// 保存映射关系
const targetMap = new WeakMap();

// 跟踪函数
function track(target: any, key: any) {
  const effect = effectStack[effectStack.length - 1];
  if (effect) {
    let depMap = targetMap.get(target);
    // 如果 depMap 不存在
    if (!depMap) {
      depMap = new Map();

      targetMap.set(target, depMap);
    }

    // 获取 key 对应的 set 集合
    let deps = depMap.get(key);

    if (!deps) {
      deps = new Set();
      depMap.set(key, deps);
    }

    // 将当前活动响应式函数放入 deps 中
    deps.add(effect);
  }
}

// 触发函数
function trigger(target: any, key: any) {
  const depMap = targetMap.get(target);
  if (!depMap) {
    return;
  }

  const deps = depMap.get(key);
  if (deps) {
    deps.forEach((dep) => dep());
  }
}

const obj: any = reactive({
  foo: "foo",
  person: {
    name: "nnn",
  },
});

// get
// obj.foo;
// set
// obj.foo = "foooooo";
// deleteProperty
// obj.bar = "bar";
// delete obj.bar;
// obj.person.name;
