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
const preLoadImg = new PreLoadImg(imgNode);
const proxyImg = new ProxyImg(preLoadImg);

proxyImg.setSrc("https://cdn2.thecatapi.com/images/ced.jpg");

// 事件在 n 后执行，如果 n 秒内别多次执行，则重新计时
const debounce = (fn: Function, delay = 500) => {
  let timer: null | number = null;

  return function (...reset) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      return fn.apply(this, reset);
    }, delay);
  };
};

// 单位时间内执行一次，如果单位时间内重复执行，则只执行一次
const throttle = function (fn: Function, delay = 500) {
  let flag = true;
  let timer = null;

  return function (...args: unknown[]) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      flag = true;
      fn.apply(this, args);
    }, delay);
  };
};

function testFn2(num: number, num2: number) {
  console.log("num :>> ", num);
  console.log("num2 :>> ", num2);
}

imgNode.addEventListener("click", debounce(testFn2, 2000));
// imgNode.addEventListener("click", throttle(testFn2, 2000));
