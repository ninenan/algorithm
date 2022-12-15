let originalEl: HTMLElement | null = null; // 来源的 dom
let cloneEl: HTMLElement | null = null; // 克隆的 dom

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
  if (cloneEl && originalEl) {
    const { top, left } = originalEl?.getBoundingClientRect();

    console.log(top);
    console.log(top);
    changeStyle(cloneEl, [`left: ${left}px`, `top: ${top}px`]);
    maskEl.appendChild(cloneEl);
  }
};

const changeStyle = (el: HTMLElement, arr: string[]) => {
  const originalStyle = el.style.cssText.split(";"); // 获取设置的 css 样式
  originalStyle.pop(); // 空字符串

  el.style.cssText = originalStyle.concat(arr).join(";") + ";";
};
