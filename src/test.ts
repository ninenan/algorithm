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
