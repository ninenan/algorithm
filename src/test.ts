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
    // 监听目标图片的加载情况，完成式再将 img 节点的 src 属性设置为目标图片的 url
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

proxyImg.setSrc("https://cdn2.thecatapi.com/images/ced.jpg");

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

// 单位时间内执行一次，如果单位时间内重复执行，则只执行一次
const throttle = function (fn: Function, delay = 500) {
  let flag = true;

  return function (...args: unknown[]) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      flag = true;
      fn.apply(this, args);
    }, delay);
  };
};

function testFn2(event: EventTarget) {
  console.log("event :>> ", event);
}

const clickTestFn = debounce(testFn2, 5000, true);

imgNode.addEventListener("click", clickTestFn);
btn.addEventListener("click", () => clickTestFn.cancel());

// imgNode.addEventListener("click", throttle(testFn2, 2000));
