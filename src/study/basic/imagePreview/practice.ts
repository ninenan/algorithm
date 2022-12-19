// 1. 获取点击的源图片
// 2. 复制一份源图片，用于遮罩层上的显示
// 3. 点击源图片，遮罩层显示
// 4. 遮罩层点击，遮罩层消失

let originalEl: HTMLElement | null = null;
let cloneEl: HTMLElement | null = null;

document.getElementById("list")?.addEventListener("click", (e: Event) => {
  // 取消默认事件
  e.preventDefault();
  const { target } = e || {};

  // 判断当前点击的标签是否存在 item 的类名
  if (target && (target as HTMLElement).classList.contains("item")) {
    originalEl = target as HTMLElement;
    cloneEl = target?.cloneNode(true);
    if (originalEl?.style) {
      originalEl.style.visibility = "hidden";
    }
    toggleMask();
  }
});

const toggleMask = () => {
  const maskEl = document.createElement("div");
  maskEl.classList.add("modal");

  document.body.appendChild(maskEl);
  maskEl.addEventListener("click", maskClickFn);
  if (cloneEl && originalEl) {
    maskEl.appendChild(cloneEl);
    const { left, top } = originalEl.getBoundingClientRect();
    changeStyle(cloneEl, [`top: ${top}px`, `left: ${left}px`]);
    maskEl.appendChild(cloneEl);
  }
};

const maskClickFn = () => {
  const maskEl = document.getElementsByClassName("modal")[0];
  document.body.removeChild(maskEl);
  if (originalEl?.style) {
    originalEl.style.visibility = "initial";
  }
  maskEl.removeEventListener("click", maskClickFn);
};

const changeStyle = (el: HTMLElement, arr: string[]) => {
  const originalStyle = el.style.cssText.split(";");
  originalStyle.pop();

  el.style.cssText = originalStyle.concat(arr).join(";") + ";";
};
