```javascript
const RE = /ab{2,5}c/g; // 表示匹配 第一个字符是 a，2-5 的 b 最后一个字符是 c
const string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";

console.log(string.match(RE)); // [ 'abbc', 'abbbc', 'abbbbc', 'abbbbbc' ]
```

```javascript
const RE = /a[123]b/g; // 表示匹配 a1b a2b a3b
const str = "a1ba2ba3ba4ba5b";

console.log(str.match(RE)); // [ 'a1b', 'a2b', 'a3b' ]
```

```javascript
const RE1 = /[123456789abcdefgABCDEFG]/g;
const RE2 = /[1-9a-gA-G]/g; // 和 RE1 表示的一致

const str = "1gGoodApple";
console.log(str.match(RE1)); // [ '1', 'g', 'G', 'd', 'A', 'e' ]
console.log(str.match(RE2)); // [ '1', 'g', 'G', 'd', 'A', 'e' ]
```

```javascript
const RE1 = /[a\-z]/g; // 需要匹配 - 的话可以转义 也可以调换下位置
const RE2 = /[-az]/g;
const RE3 = /[az-]/g;
const str = "abcdefg-z";

console.log(str.match(RE1)); // ['a' ,'-', 'z']
console.log(str.match(RE2)); // ['a' ,'-', 'z']
console.log(str.match(RE3)); // ['a' ,'-', 'z']
```

```javascript
const RE = /[^abc]/g; // ^ 表示取反的意思 表示取任意不在 abc 的字符
const str = "abcdefg";

console.log(str.match(RE)); // [ 'd', 'e', 'f', 'g' ]
```

| 修饰符            | 描述                                                                              |
| :---------------- | :-------------------------------------------------------------------------------- |
| i                 | 执行对大小写不敏感的匹配。                                                        |
| g                 | 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。                          |
| m                 | 执行多行匹配。                                                                    |
| .                 | 匹配除换行符外的任意字符                                                          |
| [a-z0-9]          | 匹配括号中的字符集中的任意一个字符（小写字母和数字）                              |
| [^a-z0-9]         | 匹配任意不在括号中的字符集中的字符                                                |
| \d                | 匹配数字[0-9],中括号表示范围。                                                    |
| \D                | 匹配非数字，同[ ^0-9 ]相同                                                        |
| \w                | 匹配字母和数字及\_                                                                |
| \W                | 相当于 [ ^A-Za-z0-9_ ] 例如, `/\W/` 或者 `/[^A-Za-z0-9_]/` 匹配 "50%." 中的 '%'。 |
| \S                | 匹配非空白字符。                                                                  |
| \s                | 查找空白字符。                                                                    |
| \b                | 匹配单词边界。                                                                    |
| \n                | 匹配换行符                                                                        |
| ^                 | 行首匹配 以及 取反                                                                |
| $                 | 行尾匹配                                                                          |
| x?                | 匹配 0 个或 1 个 x                                                                |
| x\*               | 匹配 0 个或任意多个 x                                                             |
| x+                | 匹配至少一个 x                                                                    |
| (xyz)+            | 匹配至少一个(xyz)                                                                 |
| x{m,n}            | 匹配最少 m 个、最多 n 个 x                                                        |
| this\|where\|logo | 匹配 this 或 where 或 logo 中任意一个                                             |
| \0                | 查找 NULL 字符。                                                                  |
| \f                | 查找换页符。                                                                      |
| \r                | 查找回车符。                                                                      |
| \t                | 查找制表符。                                                                      |
| \v                | 查找垂直制表符。                                                                  |

匹配任意字符

```javascript
const RE1 = /[\d\D]/g;
const RE2 = /[^]/g;
const RE3 = /[\w\W]/g;
const RE4 = /[\s\S]/g;
const str = "1sA你=-、。‘；";

console.log(str.match(RE1)); // [ '1', 's', 'A', '你', '=', '-', '、', '。', '‘', '；' ]
console.log(str.match(RE2)); // [ '1', 's', 'A', '你', '=', '-', '、', '。', '‘', '；' ]
console.log(str.match(RE3)); // [ '1', 's', 'A', '你', '=', '-', '、', '。', '‘', '；' ]
console.log(str.match(RE4)); // [ '1', 's', 'A', '你', '=', '-', '、', '。', '‘', '；' ]
```

贪婪匹配

```javascript
const RE = /\d{2,5}/g; // 数字连续出现 2 到 5 次。会匹配 2 位、3 位、4 位、5 位连续数字 会尽可能多的匹配
const str = "12 123 12345 123456 ";

console.log(str.match(RE)); // [ '12', '123', '12345', '12345' ]
```

惰性匹配

```javascript
const RE = /\d{2,5}?/g; // 数字出现 2 到 5 次都行，当 2 个就够的时候，就不再往下尝试了
const str = "12 123 12345 123456 ";

console.log(str.match(RE)); // [ '12', '12', '12', '34', '12', '34', '56' ]
```

通过**在量词后面加个问号**就能实现惰性匹配，因此所有惰性匹配情形如下

| 惰性量词 | 贪婪量词 |
| :------- | :------- |
| {m,n}?   | {m,n}    |
| {m,}?    | {m,}     |
| ??       | ?        |
| +?       | +        |
| \_?      | \_       |

多选分支

```javascript
const RE = /good|Nice/g; // 匹配字符 good 或者 Nice
const str = "goodNice";

console.log(str.match(RE)); // ['good', 'Nice']
```

分支结构是惰性的，即当前面的匹配上了，后面的就不再尝试了。

```javascript
const RE = /good|goodBye/g;
const str = "goodBye, goodBye";

console.log(str.match(RE)); // ['good', 'good']
```

分支结构是惰性的，即当前面的匹配上了，后面的就不再尝试了。

```javascript
const RE = /goodBye|good/g;
const str = "goodBye, goodBye";

console.log(str.match(RE)); // ['goodBye', 'goodBye']
```

```javascript
// ^ 匹配开头
// $ 匹配结尾

const RE = /^|$/g;
const res = "hello".replace(RE, "#");
console.log(res); // #hello#
```

\b
匹配单词边界（\w 和 \W 之间的位置，\w 与 ^ 之间的位置，和 \w 与 $ 之间的位置）

\w 是字符组 [0-9a-zA-Z_] 的简写形式，即 \w 是字母数字或者下划线的中任何一个字 符。
\W 是排除字符组 [^0-9a-za-z_] 的简写形式，即 \W 是 \w 以外的任何一个字符。

```javascript
const RE = /\b/g;
const res = "[js]_my_friend.jpg".replace(RE, "#");

console.log(res); // [#js#]#_my_friend#.#jpg#
```

\B
\b 取反的意思

```javascript
const RE = /\B/g;
const res = "[js]_my_friend.jpg".replace(RE, "#");

console.log(res); // #[j#s]_#m#y#_#f#r#i#e#n#d.j#p#g
```

正向前瞻（条件后面一定要有什么`?=`）和反向前瞻（条件后面不能有什么` ?!`）

```javascript
const str = "123.jpg,456.jpg,789.gif";
const reg1 = /\d+\.jpg/g;
const reg2 = /\d+(?=\.jpg)/g;
const reg3 = /\d+(?!\.jpg)/g;

console.log(str.match(reg1)); // [ '123.jpg', '456.jpg' ]
console.log(str.match(reg2)); // [ '123', '456' ]
console.log(str.match(reg3)); // [ '12', '45', '789' ]
```

```javascript
const RE = /(?=l)/g;
const res = "hello".replace(RE, "#");

console.log(res); // he#l#lo
```

```javascript
const RE = /(?!l)/g;
const res = "hello".replace(RE, "#");

console.log(res); // #h#ell#o#
```

## 案例

### 1. 匹配十六进制颜色

```javascript
const RE = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/g;
const str = "#ffbbad,#ddd,#fff,#FFF,#Fc01DF";

console.log(str.match(RE)); // [ '#ffbbad', '#ddd', '#fff', '#FFF', '#Fc01DF' ]
```

### 2. 匹配 24 小时时间

```javascript
// 23:59
// 09:09
// 19:59

const RE = /(([01][0-9]|[2][0-3]):([0-5][0-9]))/g;
const str1 = "23:59, 00:00, 01:01";

console.log(str1.match(RE)); // [ '23:59', '00:00', '01:01' ]
```

### 3. 匹配 24 小时时间

```javascript
const RE = /^(0?[1-9]|1[0-9]|[2][0-3]):(0?[1-9]|1[0-9])$/;
const str = "7:9";

console.log(RE.test(str)); // true
```

### 4. 匹配日期

格式 yyyy-mm-dd

```javascript
const RE = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const str1 = "2020-12-31";
const str2 = "2020-09-01";
const str3 = "2020-10-31";
const str4 = "2020-01-01";

console.log(RE.test(str1)); // true
console.log(RE.test(str2)); // true
console.log(RE.test(str3)); // true
console.log(RE.test(str4)); // true
```

### 5.window 操作系统文件路径

```javascript
// F:\study\javascript\regex\regular expression.pdf
// F:\study\javascript\regex\
// F:\study\javascript
// F:\

// [^\\:*<>|"?\r\n/] 这里表示合法的字符
// 另外它们的名字不能为空名，至少有一个字符，也就是要使用量词 +。因此匹配 文件夹\，可用[^\\:*<>|"?\r\n/]+\\。
// 路径的最后一部分可以是 文件夹，没有 \，因此需要添加 ([^\\:*<>|"?\r\n/]+)?。

const RE = /^[a-zA-z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
const str1 = "F:\\study\\javascript\\regex\\regular expression.pdf";
const str2 = "F:\\study\\javascript\\regex\\";
const str3 = "F:\\study\\javascript";
const str4 = "F:\\";

console.log(RE.test(str1)); // true
console.log(RE.test(str2)); // true
console.log(RE.test(str3)); // true
console.log(RE.test(str4)); // true
```

### 6. 匹配手机号

```javascript
const RE = /^1[34578]\d{9}$/g;
const str = "15111111111";

console.log(RE.test(str)); // true
```

### 7. 匹配标签中的 id

```javascript
const RE = /id=".*?"/;
const RE1 = /id="[^"]*"/;
const str = '<div id="container" class="main"></div>';

console.log(str.match(RE)[0]); // ['id="container"']
console.log(str.match(RE1)[0]); // ['id="container"']
```

### 8. 不匹配任何东西

```javascript
const RE = /.^/; // 匹配一个字符，但是该字符后面是开头
```

### 9. 数字千位分隔符

#### 正整数

```javascript
const RE = /(?!^)(?=(\d{3})+$)/g;
const str = "123123123123";

console.log(str.replace(RE, ",")); // 123,123,123,123
```

#### 负数和小数

```javascript
const RE = /(?!^)(?=(\d{3})+$)/g;
const RE1 = /(?!\b)(?=(\d{3})+\b)/g;
const RE2 = /\B(?=(\d{3})+\b)/g;
const str = "-123123123";

console.log(str.replace(/\d+/, (s) => s.replace(RE, ","))); // -123,123,123
console.log(str.replace(RE1, ",")); // -123,123,123
console.log(str.replace(RE2, ",")); // -123,123,123
```

### 10. 货币格式化

```javascript
const num = 188;
const format = (num: number) =>
  num
    .toFixed(2)
    .replace(/\B(?=(\d{3})+\b)/g, ",")
    .replace(/^/, "$$ ");

console.log(format(188)); // $ 188.00
console.log(format(-123123.123123)); // $ -123,123.12
```
