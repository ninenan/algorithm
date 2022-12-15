let originalEl: HTMLElement | null = null; // 来源的 dom
let cloneEl: Node | null = null; // 克隆的 dom

document.getElementById("list")?.addEventListener("click", (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLImageElement;

  // 判断点击的标签当中是否存在 item 类名
  if (target.classList.contains("item")) {
    originalEl = target;
    cloneEl = originalEl.cloneNode(true); // 深度克隆节点
    originalEl.style.visibility = "hidden";
    openPreveiw();
  }
});

// 显示预览
const openPreveiw = () => {
  const maskEl = document.createElement("div");
  maskEl.classList.add("modal");

  document.body.appendChild(maskEl);

  const maskClickFn = () => {
    document.body.removeChild(maskEl);

    if (originalEl) {
      originalEl.style.visibility = "initial";
    }

    maskEl.removeEventListener("click", maskClickFn);
  };

  maskEl.addEventListener("click", maskClickFn);
  // 蒙层中添加图片
  if (cloneEl) {
    maskEl.appendChild(cloneEl);
  }
};
