const hasOwnProperty = Object.prototype.hasOwnProperty
const objectToString = Object.prototype.toString
const isObject = (val) => objectToString.call(val).slice(8, -1) === 'Object'

const deepClone = (source) => {
    const uniqueList = []
    let root = {}

    const loopList = [
        {
            parent: root,
            key: undefined,
            data: source
        }
    ]

    while (loopList.length) {
        const node = loopList.pop()
        const { parent, key, data } = node

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent
        if (typeof key !== 'undefined') {
            res = parent[key] = {}
        }

        // 如果数据已经存在
        const uniqueData = find(uniqueList, source)
        if (uniqueData) {
            parent[key] = uniqueData.target
            // 中断本次循环
            continue
        }

        // 数据不存在
        uniqueList.push({
            target: res,
            source: data
        })

        for (const key in data) {
            if (hasOwnProperty.call(data, key)) {
                if (isObject(data)) {
                    loopList.push({
                        parent: res,
                        key,
                        data: data[key]
                    })
                } else {
                    res[key] = data[key]
                }
            }
        }
    }
    return root
}

function find(uniqueList, source) {
    for (let index = 0; index < uniqueList.length; index++) {
        if (uniqueList[index].source === source) {
            return uniqueList[index]
        }
    }

    return null
}

var a1 = {
    b:
    {
        c:
            { d: 123 }
    }
}
var a3 = deepClone(a1); // 深拷贝
console.log(a3.b.c === a1.b.c); // false


var b = {};
var a = { a1: b, a2: b };
console.log(a.a1 === a.a2); // true

var c = deepClone(a);
console.log(c.a1 === c.a2); // false
