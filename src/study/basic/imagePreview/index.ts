let originalEl: HTMLElement | null = null; // 来源的 dom
let cloneEl: HTMLElement | null = null; // 克隆的 dom
const { innerWidth: winWidth, innerHeight: winHeight } = window; // 获取可视窗口的宽高
let offset = {
  left: 0,
  top: 0,
};

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
  maskEl.addEventListener("click", maskClickFn);
  // 蒙层中添加图片
  if (cloneEl && originalEl) {
    // 获取原始图片的距离可是窗口的 top 和 left 值
    const { top, left } = originalEl?.getBoundingClientRect();
    const { offsetWidth, offsetHeight } = originalEl;

    changeStyle(cloneEl, [`left: ${left}px`, `top: ${top}px`]);
    maskEl.appendChild(cloneEl);

    // 来源图片中心点
    const originalCenterPoint = {
      x: offsetWidth / 2 + left,
      y: offsetHeight / 2 + top,
    };
    // 可视区域中心点
    const winCenterPoint = {
      x: winWidth / 2,
      y: winHeight / 2,
    };
    const offsetDistance = {
      left: winCenterPoint.x - originalCenterPoint.x + left,
      top: winCenterPoint.y - originalCenterPoint.y + top,
    };
    const diffs = {
      left: ((adaptScale() - 1) * offsetWidth) / 2,
      top: ((adaptScale() - 1) * offsetHeight) / 2,
    };

    changeStyle(cloneEl, [
      "transition: all .3s",
      `width: ${offsetWidth * adaptScale()}px`,
      `transform: translate(${offsetDistance.left - left - diffs.left}px, ${
        offsetDistance.top - top - diffs.top
      }px)`,
    ]);

    setTimeout(() => {
      if (cloneEl) {
        changeStyle(cloneEl, [
          "transition: all 0s",
          `left: 0`,
          `top: 0`,
          `transform: translate(${offsetDistance.left - diffs.left}px, ${
            offsetDistance.top - diffs.top
          }px)`,
        ]);
        offset = {
          left: offsetDistance.left - diffs.left,
          top: offsetDistance.top - diffs.top,
        }; // 记录值
      }
    }, 300);
  }
};

const changeStyle = (el: HTMLElement, arr: string[]) => {
  const originalStyle = el.style.cssText.split(";"); // 获取设置的 css 样式
  originalStyle.pop(); // 空字符串

  el.style.cssText = originalStyle.concat(arr).join(";") + ";";
};

/**
 * 计算图片的放大比例
 *
 * @returns {number} 放大比例
 */
const adaptScale = () => {
  let scale = 1;
  // 获取文档中图片的宽高
  if (originalEl) {
    const { offsetWidth: w, offsetHeight: h } = originalEl;

    scale = winWidth / w;
    if (h * scale > winHeight - 80) {
      scale = (winHeight - 80) / h;
    }
  }

  return scale;
};

/**
 * 蒙层监听事件
 *
 * @param {Event} e - event
 */
const maskClickFn = (e: Event) => {
  console.log(e.target);
  if (originalEl && cloneEl) {
    const { top, left, right } = originalEl?.getBoundingClientRect();

    changeStyle(cloneEl, [
      "transition: all .3s",
      `left: ${left}px`,
      `top: ${top}px`,
      `transform: translate(0, 0)`,
      `width: ${right - left}px`,
    ]);

    setTimeout(() => {
      const maskEl = document.getElementsByClassName("modal")[0];
      document.body.removeChild(maskEl);
      (originalEl as HTMLElement).style.visibility = "initial";
      maskEl.removeEventListener("click", maskClickFn, false);
    }, 300);
  }
};
