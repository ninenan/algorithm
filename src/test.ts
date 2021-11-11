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

const getInstance = (function () {
  let instance: HTMLElement | null = null;
  return () => {
    if (!instance) {
      instance = document.createElement("div");
      instance.className = "modal";
      instance.style.display = "none";
      instance.innerHTML = "我是全局唯一的 modal";
      document.body.appendChild(instance);
    }

    return instance;
  };
})();

document.getElementsByClassName("open")[0].addEventListener("click", () => {
  const modal = getInstance();
  modal.style.display = "block";
});

document.getElementsByClassName("close")[0].addEventListener("click", () => {
  const modal = getInstance();
  modal.style.display = "none";
});
