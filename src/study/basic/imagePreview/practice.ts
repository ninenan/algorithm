// 1. 获取点击的源图片
// 2. 复制一份源图片，用于遮罩层上的显示
// 3. 点击源图片，遮罩层显示
// 4. 遮罩层点击，遮罩层消失

let originalEl: HTMLElement | null = null;
let cloneEl: HTMLElement | null = null;
const { innerWidth: winInnerWidth, innerHeight: winInnerHeight } = window;
let offset = {
  left: 0,
  top: 0,
};

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
    const { offsetWidth, offsetHeight } = originalEl;

    const originalCenterPoint = {
      x: offsetWidth / 2,
      y: offsetHeight / 2,
    };
    const winCenterPonit = {
      x: winInnerWidth / 2,
      y: winInnerHeight / 2,
    };
    const offsetDistance = {
      left: winCenterPonit.x - originalCenterPoint.x,
      top: winCenterPonit.y - originalCenterPoint.y,
    };
    const diff = {
      left: ((calculateScale() - 1) * offsetWidth) / 2,
      top: ((calculateScale() - 1) * offsetHeight) / 2,
    };

    changeStyle(cloneEl, [
      `transition: all .3s`,
      `width: ${offsetWidth * calculateScale()}px`,
      `transform: translate(${offsetDistance.left - left - diff.left}px, ${
        offsetDistance.top - top - diff.top
      }px)`,
    ]);

    setTimeout(() => {
      if (cloneEl) {
        changeStyle(cloneEl, [
          "transition: all 0s",
          "left: 0",
          "top: 0",
          `transform: translate(${offsetDistance.left - diff.left}px, ${
            offsetDistance.top - diff.top
          }px)`,
        ]);
        offset = {
          left: offsetDistance.left - diff.left,
          top: offsetDistance.top - diff.top,
        };
      }
    }, 300);
  }
};

const maskClickFn = () => {
  if (cloneEl && originalEl) {
    const { top, left, right } = originalEl.getBoundingClientRect();
    changeStyle(cloneEl, [
      "transition: all .3s",
      `left: ${left}px`,
      `top: ${top}px`,
      `transform: translate(0, 0)`,
      `width: ${right - left}px`,
    ]);
  }

  setTimeout(() => {
    const maskEl = document.getElementsByClassName("modal")[0];
    document.body.removeChild(maskEl);
    maskEl.removeEventListener("click", maskClickFn);
    if (originalEl?.style) {
      originalEl.style.visibility = "initial";
    }
  }, 300);
};

const changeStyle = (el: HTMLElement, arr: string[]) => {
  const originalStyle = el.style.cssText.split(";");
  originalStyle.pop();

  el.style.cssText = originalStyle.concat(arr).join(";") + ";";
};

/**
 * 计算缩放值
 *
 * @returns {number} 缩放值
 */
const calculateScale = () => {
  let scale = 1;

  if (originalEl) {
    const { offsetWidth, offsetHeight } = originalEl;

    scale = winInnerWidth / offsetWidth;
    if (offsetHeight * scale > winInnerHeight - 80) {
      scale = (winInnerHeight - 80) / offsetHeight;
    }
  }

  return scale;
};

export {};
