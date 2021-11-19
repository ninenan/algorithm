/* class Modal {
  static instance: null | HTMLElement;
  static getInstance() {
    if (!this.instance) {
      this.instance = document.createElement("div");
      this.instance.innerHTML = "我是全局唯一的 modal";
      this.instance.className = "modal";
      this.instance.style.display = "none";
      document.body.appendChild(this.instance);
    }

    return this.instance;
  }
} */

// const Modal = (function () {
//   let instance: HTMLElement | null = null;
//   return () => {
//     if (!instance) {
//       instance = document.createElement("div");
//       instance.className = "modal";
//       instance.style.display = "none";
//       instance.innerHTML = "您还未登录哦";
//       document.body.appendChild(instance);
//     }
//     return instance;
//   };
// })();

// document.getElementsByClassName("open")[0].addEventListener("click", () => {
//   openModal();
//   changeBnStatus();
// });

// function openModal() {
//   const modal = Modal();
//   modal.style.display = "block";
// }

// document.getElementsByClassName("close")[0].addEventListener("click", () => {
//   const modal = Modal();
//   modal.style.display = "none";
// });

// // 修改按钮文案
// function changeBtnText() {
//   const btn = document.getElementsByClassName("open")[0];
//   btn.innerHTML = "快去登录";
// }

// // 按钮置灰
// function disableBtn() {
//   const btn = document.getElementsByClassName("open")[0];
//   btn.setAttribute("disabled", "true");
// }

// // 修改按钮状态
// function changeBnStatus() {
//   changeBtnText();
//   disableBtn();
// }

class Modal {
  static instance: HTMLElement | null;
  static getInstance() {
    if (!this.instance) {
      this.instance = document.createElement("div");
      this.instance.innerHTML = "我是全局唯一的 modal";
      this.instance.style.display = "none";
      this.instance.className = "modal";
      document.body.appendChild(this.instance);
    }
    return this.instance;
  }
}

// 打开按钮
class OpenBtn {
  // 打开 modal
  onClick() {
    const modal = Modal.getInstance();
    modal.style.display = "block";
  }
}

// 定义按钮的装饰着
class Decorator {
  openBtn: OpenBtn;
  constructor(openBtn: OpenBtn) {
    this.openBtn = openBtn;
  }

  onClick() {
    this.openBtn.onClick();
    this.changeBtnStatus();
  }
  // 改变按钮状态
  changeBtnStatus() {
    this.changeBtnText();
    this.disableBtn();
  }
  // 按钮置灰
  disableBtn() {
    const btn = document.getElementsByClassName("open")[0];
    btn.setAttribute("disabled", "true");
  }
  // 改变按钮文案
  changeBtnText() {
    const btn = document.getElementsByClassName("open")[0];
    btn.innerHTML = "您还未登录哦";
  }
}

const openBtn = new OpenBtn();
const decorator = new Decorator(openBtn);

document.getElementsByClassName("open")[0].addEventListener("click", () => {
  decorator.onClick();
});

document.getElementsByClassName("close")[0].addEventListener("click", () => {
  const modal = Modal.getInstance();
  modal.style.display = "none";
});
