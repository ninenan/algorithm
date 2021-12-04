const hasOwnProperty = Object.prototype.hasOwnProperty
const objectToString = Object.prototype.toString
const isObject = (val) => objectToString.call(val).slice(8, -1) === 'Object'

const deepClone1 = (source) => {
    if (!isObject(source)) return source

    const target = {}
    for (const key in source) {
        if (hasOwnProperty.call(source, key)) {
            if (isObject(source[key])) {
                target[key] = deepClone1(source[key])
            } else {
                target[key] = source[key]
            }
        }
    }

    return target
}

// var a1 = { b: { c: {} } }
// var a3 = deepClone1(a1); // 深拷贝
// console.log(a3.b.c === a1.b.c); // false

const deepClone2 = (source) => {
    const root = {}
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: source
        }
    ]

    while (loopList.length) {
        const node = loopList.pop()
        const { data, key, parent } = node

        let res = parent

        if (typeof key !== 'undefined') {
            res = parent[key] = {}
        }

        for (const key in data) {
            if (hasOwnProperty.call(data, key)) {
                if (isObject(data[key])) {
                    loopList.push({
                        parent: res,
                        key,
                        data: data[key]
                    })
                }
            } else {
                res[key] = data[key]
            }
        }
    }

    return root
}

/* var a1 = {
    b:
    {
        c:
            { d: 123 }
    }
}
var a3 = deepClone2(a1); // 深拷贝
console.log(a3.b.c === a1.b.c); // false */


var b = {};
var a = { a1: b, a2: b };
console.log(a.a1 === a.a2); // true

var c = deepClone2(a);
console.log(c.a1 === c.a2); // false
