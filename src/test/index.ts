class PreLoadImg {
  // 真实的 dom 节点
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
    vImage.src = targetUrl;
  }
}

const throttle = (fn: Function, delay = 500): any => {
  let flag = true;

  const throttled = (...args: any[]) => {
    if (!flag) {
      return;
    }
    flag = false;
    fn.apply(this, args);

    setTimeout(() => {
      flag = true;
    }, delay);
  };

  throttled.cancel = () => {
    flag = true;
  };

  return throttled;
};

const debounce = (fn: Function, delay = 500, immediate = false): any => {
  let timer: null | ReturnType<typeof setTimeout> = null;

  const debounced = (...rest: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }

    if (immediate) {
      let callNow = !timer;

      timer = setTimeout(() => {
        timer = null;
      }, delay);

      if (callNow) {
        fn.apply(this, rest);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, rest);
      }, delay);
    }
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = null;
  };

  return debounced;
};

const imgNode = document.getElementsByTagName("img")[0];
const preLoadImg = new PreLoadImg(imgNode);
const proxyImg = new ProxyImg(preLoadImg);

const fn = (e: any) => {
  console.log("e", e);
  console.log(222);
};

// imgNode.addEventListener("click", throttle(fn, 2000));
imgNode.addEventListener("click", debounce(fn, 2000, true));

proxyImg.setSrc("https://cdn2.thecatapi.com/images/ced.jpg");

const imgs = document.getElementById("root")?.getElementsByTagName("img");

console.log(imgs);
