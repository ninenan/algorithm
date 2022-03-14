const getList = () => new Promise((resolve) => {
    const ajax = new XMLHttpRequest();
    ajax.open('get', 'http://localhost:3000/');
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4) {
            if (ajax.status === 200) {
                resolve(JSON.parse(ajax.responseText));
            }
        }
    };
});

const container = document.getElementById('container');

/** 直接渲染 */
// 需要 931ms
// const renderList = async () => {
//     console.time('begin');
//     const list = await getList();
//     list.forEach((element) => {
//         const div = document.createElement('div');
//         div.className = 'item';
//         div.innerHTML = `<img src="${element.src}"><sapn>${element.name}</span>`;
//         container.appendChild(div);
//     });
//     console.timeEnd('begin');
// };
// renderList();

/** setTimeout 分页渲染 */
// 246ms
// const renderList = async () => {
//     console.time('timer');
//     const list = await getList();
//     const len = list.length;
//     const page = 0;
//     const limit = 200;
//     const totoalPage = Math.ceil(len / limit);

//     const render = (page) => {
//         if (page >= totoalPage) return;
//         setTimeout(() => {
//             for (let index = page * limit; index < page * limit + limit; index++) {
//                 const item = list[index];
//                 const div = document.createElement('div');
//                 div.className = 'item';
//                 div.innerHTML = `<img src="${item.src}"><sapn>${item.name}</span>`;
//                 container.appendChild(div);
//             }
//             render(page + 1);
//         }, 0);
//     };
//     render(page);
//     console.timeEnd('timer');
// };

// renderList();

/** requestAnimationFrame */
// 184ms
// const renderList = async () => {
//     console.time('timer');
//     const list = await getList();
//     const len = list.length;
//     const page = 0;
//     const limit = 200;
//     const totoalPage = Math.ceil(len / limit);

//     const render = (page) => {
//         if (page >= totoalPage) return;
//         requestAnimationFrame(() => {
//             for (let index = page * limit; index < page * limit + limit; index++) {
//                 const item = list[index];
//                 const div = document.createElement('div');
//                 div.className = 'item';
//                 div.innerHTML = `<img src="${item.src}"><sapn>${item.name}</span>`;
//                 container.appendChild(div);
//             }
//             render(page + 1);
//         });
//     };

//     render(page);
//     console.timeEnd('timer');
// };

// renderList();

/** 文档碎片 + requestAnimationFrame */
// 50ms
// const renderList = async () => {
//     console.time('timer');
//     const list = await getList();
//     const len = list.length;
//     const page = 0;
//     const limit = 200;
//     const totalPage = Math.ceil(len / limit);

//     const render = (page) => {
//         requestAnimationFrame(() => {
//             if (page >= totalPage) return;
//             const fragment = document.createDocumentFragment();
//             for (let index = page * limit; index < page * limit + limit; index++) {
//                 const item = list[index];
//                 const div = document.createElement('div');
//                 div.className = 'item';
//                 div.innerHTML = `<img src="${item.src}"><sapn>${item.name}</span>`;
//                 fragment.appendChild(div);
//             }
//             container.appendChild(fragment);
//             render(page + 1);
//         });
//     };
//     render(page);

//     console.timeEnd('timer');
// };
// renderList();
