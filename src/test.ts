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

const obj = {
  value: 1,
};

function foo() {
  return this.value;
}

const objFoo = foo.bind(obj);

// console.log(objFoo()); // 1

Function.prototype.myBind = function (context = window) {
  let self = this;
  let NOOP = function () {};

  // 获取函数从第二个参数到最后一个参数
  const args = [].slice.call(arguments, 1);
  // const args = Array.prototype.slice.call(arguments, 1); 也可以使用这种写法
  let fBound = function () {
    // 这时候的 arguments 是 bind 返回的函数所传递的参数
    const bindArgs = [].slice.call(arguments);
    return self.apply(
      this instanceof NOOP ? this : context,
      args.concat(bindArgs)
    );
  };

  NOOP.prototype = this.prototype;
  fBound.prototype = new NOOP();
  return fBound;
};

const objFoo2 = foo.myBind(obj);

// console.log(objFoo2()); // 1

let testFoo = {
  value: 1,
};

function bar(name: string, age: number) {
  this.habit = "shopping";
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = "xxx";

let bindFoo = bar.bind(testFoo, "xxx1");
let testObj = new bindFoo(18);

// undefined
// xxx1
// 18
console.log(testObj.habit); // shopping
console.log(testObj.friend); // xxx

let bindFoo2 = bar.myBind(testFoo, "xxx2");
let testObj2 = new bindFoo2(20);
// undefined
// xxx2
// 20
console.log(testObj2.habit); // shopping
console.log(testObj2.friend); // xxx
