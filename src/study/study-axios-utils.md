# axios 工具函数

> [源码地址](https://github.com/axios/axios/blob/master/lib/utils.js)

### isArray

是否是数组

```javascript
function isArray(val) {
  return Array.isArray(val);
}
```

### isUndefined

是否是 undefined

```javascript
function isUndefined(val) {
  return typeof val === "undefined";
}
```

### isBuffer

是否是 buffer

> [buffer-官方文档](http://nodejs.cn/api/buffer.html#buffer)

```javascript
function isBuffer(val) {
  return (
    val !== null &&
    !isUndefined(val) &&
    val.constructor !== null &&
    !isUndefined(val.constructor) &&
    typeof val.constructor.isBuffer === "function" &&
    val.constructor.isBuffer(val)
  );
}
```

### isArrayBuffer

是否是 ArrayBuffer

> [ArrayBuffer-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

```javascript
const toString = Object.prototype.toString;

function isArrayBuffer(val) {
  return toString.call(val) === "[object ArrayBuffer]";
}
```

### isFormData

是否是 FormData

> [FormData-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/FormData)

```javascript
const toString = Object.prototype.toString;

function isFormData(val) {
  return toString.call(val) === "[object FormData]";
}
```

### isArrayBufferView

是否是 ArrayBuffer 上的视图

```javascript
function isArrayBufferView(val) {
  var result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
```

### isString

是否是字符串

```javascript
function isString(val) {
  return typeof val === "string";
}
```

### isNumber

是否是数字

```javascript
function isNumber(val) {
  return typeof val === "number";
}
```

### isObject

是否是对象

```javascript
function isObject(val) {
  return val !== null && typeof val === "object";
}
```

### isPlainObject

是否是纯对象

```javascript
function isPlainObject(val) {
  if (toString.call(val) !== "[object Object]") {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
```

### isDate

是否是 Date

```javascript
function isDate(val) {
  return toString.call(val) === "[object Date]";
}
```

### isFile

是否是 file

```javascript
function isFile(val) {
  return toString.call(val) === "[object File]";
}
```

### isBlob

是否是 blob 类型

```javascript
function isBlob(val) {
  return toString.call(val) === "[object Blob]";
}
```

### isFunction

是否是 function

```javascript
function isFunction(val) {
  return toString.call(val) === "[object Function]";
}
```

### isStream

是否是 stream

> [steam-官方文档](http://nodejs.cn/api/stream.html#types-of-streams)

```javascript
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
```

### isURLSearchParams

是否是 URLSearchParams

> [URLSearchParams-MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)

```javascript
function isURLSearchParams(val) {
  return toString.call(val) === "[object URLSearchParams]";
}
```

### trim

去掉首位空格

```javascript
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
}

console.log(trim("  132  ").length); // 3
console.log(trim("  1").length); // 1
console.log(trim("1  ").length); // 1
```

### isStandardBrowserEnv

是否是标准浏览器环境

```javascript
function isStandardBrowserEnv() {
  if (
    typeof navigator !== "undefined" &&
    (navigator.product === "ReactNative" ||
      navigator.product === "NativeScript" ||
      navigator.product === "NS")
  ) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
}
```

### forEach

可以遍历数组和对象的 forEach

```javascript
function forEach(obj, fn) {
  // Don't bother if no value provided
  // 如果是 null 或者 undefined 直接返回
  if (obj === null || typeof obj === "undefined") {
    return;
  }

  // 如果不是对象 则返回一个包含此数据的数组
  // Force an array if not already something iterable
  if (typeof obj !== "object") {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    // 如果是数组
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    // 如果是对象
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
```

### merge

合并对象

```javascript
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
console.log(merge({ title: "study" }, { height: 180 })); // { title: 'study', height: 180 }
```

### extend

> [bind](https://github.com/axios/axios/blob/master/lib/helpers/bind.js)

```javascript
module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

const obj = {
  title: "study",
  info: "study-info",
};

const objB = {
  newTitle: "study-b",
  newInfo: "study-info-b",
};

console.log(extend(obj, objB));
// { title: 'study',
//   info: 'study-info',
//   newTitle: 'study-b',
//   newInfo: 'study-info-b' }
```

```javascript
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }
  return content;
}
```

## 总结

1. 学到了 forEach
2. 学到了更多的类型判断
