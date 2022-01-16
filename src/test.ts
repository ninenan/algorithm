class PreLoadImg {
  imgNode: HTMLImageElement;

  constructor(imgNode: HTMLImageElement) {
    this.imgNode = imgNode;
  }

  // 设置真实的图片地址
  setSrc(targetUrl: string) {
    this.imgNode.src = targetUrl;
  }
}

class ProxyImg {
  // 占位图 url 地址
  static LOADING_IMG = "https://cdn2.thecatapi.com/images/8kq.gif";
  // 目标Image，即PreLoadImage实例
  targetImg: PreLoadImg;

  constructor(targetImg: PreLoadImg) {
    this.targetImg = targetImg;
  }

  setSrc(targetUrl: string) {
    // 真实img节点初始化时展示的是一个占位图
    this.targetImg.setSrc(ProxyImg.LOADING_IMG);
    // 创建一个帮助加载的 Image 实例
    const vImage = new Image();
    // 监听目标图片的加载情况，完成时再将 img 节点的 src 属性设置为目标图片的 url
    vImage.onload = () => {
      this.targetImg.setSrc(targetUrl);
    };
    // 设置 src 属性，Image 实例开始加载图片
    setTimeout(() => {
      vImage.src = targetUrl;
    }, 3000);
  }
}

const imgNode = document.getElementsByTagName("img")[0];
const btn = document.getElementsByTagName("button")[0];
const preLoadImg = new PreLoadImg(imgNode);
const proxyImg = new ProxyImg(preLoadImg);

// proxyImg.setSrc("https://cdn2.thecatapi.com/images/ced.jpg");
proxyImg.setSrc(
  "https://test.com/20200803115749u=2876792700,1627849181&fm=26&gp=0.jpg"
);
/**
 * 防抖
 * 事件在 n 后执行，如果 n 秒内别多次执行，则重新计时
 * 当使用 immediate 时候，
 * 此时注意一点，就是回调函数可能是有返回值的，
 * 所以我们也要返回函数的执行结果，但是当 immediate 为 false 的时候，因为使用了 setTimeout ，
 * 我们将 fn.apply(context, args) 的返回值赋给变量，
 * 最后再 return 的时候，值将会一直是 undefined，所以我们只在 immediate 为 true 的时候返回函数的执行结果。
 * @param fn 回调函数
 * @param delay 延迟时间
 * @param immediate 是否立即执行
 * @returns 返回毁掉函数执行的结果
 */
const debounce = (fn: Function, delay = 500, immediate = false) => {
  let timer: null | number = null;
  // let result: any = null;

  const debounced = function (...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      // 如果已经执行了，则不再执行
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) {
        fn.apply(this, args);
        // result = fn.apply(this, args);
      }
    } else {
      timer = setTimeout(() => {
        return fn.apply(this, args);
      }, delay);
    }
    // return result;
  };

  /**
   * 取消 debounce 函数
   */
  debounced.cancel = function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
  };

  return debounced;
};

function testFn2(event: EventTarget) {
  console.log("event :>> ", event);
}

// debounce
/* const clickTestFn = debounce(testFn2, 2000, false);
imgNode.addEventListener("click", clickTestFn);
btn.addEventListener("click", () => clickTestFn.cancel()); */

// 单位时间内执行一次，如果单位时间内重复执行，则只执行一次
// 定时器版本
/* const throttle = function (fn: Function, delay = 500) {
  let flag = true;

  return function (...args: unknown[]) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      flag = true;
      fn.apply(this, args);
    }, delay);
  };
}; */

// 时间戳版本
const TimestampThrottle = function (fn: Function, delay: number) {
  let previous = 0;
  return function (...reset: unknown[]) {
    const nowTime = +new Date();
    if (nowTime - previous > delay) {
      previous = nowTime;
      fn.apply(this, reset);
    }
  };
};

/* const throttle3 = function (fn: Function, delay: number) {
  let timeout: number | null = null,
    previous = 0,
    args: any | null = null,
    context: any = null;

  const later = function () {
    previous = +new Date();
    timeout = null;
    fn.apply(context, args);
  };

  const throttled = function () {
    const now = +new Date();
    // 下次触发 fn 的剩余事件
    const remaining = delay - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余时间或者用户修改了系统时间
    if (remaining <= 0 || remaining > delay) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(later, delay);
    }
  };
  return throttled;
}; */

interface IOptions {
  leading?: boolean; // 表示禁用第一次执行
  trailing?: boolean; // 表示禁用停止触发的回调
}

/**
 * 节流
 * leading：false 和 trailing: false 不能同时设置。
 * 如果同时设置的话，比如当你将鼠标移出的时候，因为 trailing 设置为 false，停止触发的时候不会设置定时器，
 * 所以只要再过了设置的时间，再移入的话，就会立刻执行，
 * 就违反了 leading: false，bug 就出来了，所以，这个 throttle 只有三种用法：
 * throttle(getUserAction, 1000);
 * throttle(getUserAction, 1000, {leading: false});
 * throttle(getUserAction, 1000, {trailing: false});
 * @param fn 回调函数
 * @param delay 延迟时间
 * @param options 选项
 * @returns 执行回调函数的执行结果
 */
const throttle = function (
  fn: Function,
  delay: number,
  options: IOptions = { leading: true, trailing: true }
) {
  let timeout: number | null = null,
    context: any = null,
    previous: number = 0,
    args: any = null;

  const later = function () {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    fn.apply(context, args);
    if (!timeout) context = args = null;
  };

  const throttled = function () {
    const now = +new Date();
    if (!previous && options.leading === false) previous = now;
    const remaining = delay - (now - previous);
    context = this;
    args = arguments;
    // 如果没有剩余时间了或者用户修改了系统时间
    if (remaining <= 0 || remaining > delay) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing === true) {
      timeout = setTimeout(later, delay);
    }
  };

  /**
   * 取消
   */
  throttled.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    previous = 0;
    timeout = null;
  };

  return throttled;
};

const throttle3 = (
  fn: Function,
  delay = 500,
  options: IOptions = {
    leading: true, // 是否禁用第一次执行
    trailing: true, // 是否禁用停止触发的回调
  }
) => {
  let args: unknown[] = [];
  let self: unknown = null;
  let timer: null | number = null;
  let previous = 0;

  const later = function () {
    previous = options.leading === false ? 0 : +new Date();
    timer = null;
    return fn.apply(self, args);
  };

  const throttled = function (...reset: unknown[]) {
    self = this;
    args = reset;
    const now = +new Date();
    if (!previous && options.leading === false) {
      previous = now;
    }
    const remaining = delay - (now - previous);
    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      return fn.apply(this, reset);
    } else if (!timer && options.trailing !== false) {
      timer = setTimeout(later, delay);
    }
  };

  throttled.cancel = function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
    previous = 0;
  };

  return throttled;
};
