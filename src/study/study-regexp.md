# 学习正则的笔记

> [文章来自《JS 正则迷你书》](https://github.com/qdlaoyao/js-regex-mini-book) > [文章来自《JS 正则迷你书》](https://github.com/qdlaoyao/js-regex-mini-book) > [文章来自《JS 正则迷你书》](https://github.com/qdlaoyao/js-regex-mini-book)

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

匹配标点符号

```javascript
const RE = /\p{P}/gu;
const str = "你好，世界。,.,.";

console.log(str.match(RE)); // [ '，', '。', ',', '.', ',', '.' ]
```

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

## 括号的作用

### 分组和分支结构

#### 分组

```javascript
const RE = /(ab)+/g; // 匹配连续出现的 ab
const str = "ababa,abbb,ababab";

console.log(str.match(RE)); // [ 'abab', 'ab', 'ababab' ]
```

#### 分支结构

```javascript
const RE = /study (javascript|regexp)/g;
const str = "study javascript,study regexp,hello,world";

console.log(str.match(RE)); // [ 'study javascript', 'study regexp' ]

const RE1 = /study javascript|regexp/g;
console.log(str.match(RE1)); // [ 'study javascript', 'regexp' ]
```

### 分组引用

在匹配过程中，给每一个分组都开辟一个空间，用来存储每一个分组匹配到的数据

match 返回的一个数组，第一个元素是整体匹配结果，然后是各个分组（括号里）匹配的
内容，然后是匹配下标，最后是输入的文本。另外，正则表达式是否有修饰符 g，match
返回的数组格式是不一样的。

#### 提取数据

```javascript
const RE = /(\d{4})-(\d{2})-(\d{}2)/;
const str = "2021-01-01";

console.log(str.match(RE)); // [ '2020-01-01', '2020', '01', '01' ]
```

```javascript
const RE = /(\d{4})-(\d{2})-(\d{}2)/g;
const str = "20201-01-01";

console.log(str.match(RE)); // [ '2020-01-01' ]
```

#### 替换

yyyy-mm-dd 格式，替换成 mm/dd/yyyy

replace 中 \$1、\$2、\$3 指对应的分组

```javascript
const RE = /(\d{4})-(\d{2})-(\d{2})/;
const str = "2021-12-31";

console.log(str.replace(RE, "$3/$2/$1")); // 31/12/2021
```

```javascript
const RE = /(\d{4})-(\d{2})-(\d{2})/;
const str = "2021-12-31";

const res = str.replace(RE, (match, p1, p2, p3) => {
  return `${p1}/${p2}/${p3}`;
});

console.log(res); // 2021/12/31
```

### 反向引用

除了使用相应 API 来引用分组，也可以在正则本身里引用分组。但只能引用之前出现的分组，即反向引用。

需要匹配下面的三种
2016-06-12
2016/06/12
2016.06.12

```javascript
const RE = /\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/;
const str1 = "2020-12-31";
const str2 = "2020/12/31";
const str3 = "2020.12.31";

console.log(RE.test(str1)); // true
console.log(RE.test(str2)); // true
console.log(RE.test(str3)); // true
console.log(RE.test("2020-12/31")); // true 这里应该是 false
```

```javascript
const RE = /\d{4}(-\/\.)\d{2}\1\d{2}/; // \1 表示使用前面的 (-\/\.) 前面匹配什么 这里也会匹配什么
const str1 = "2020-12-31";
const str2 = "2020/12/31";
const str3 = "2020.12.31";

console.log(RE.test(str1)); // true
console.log(RE.test(str2)); // true
console.log(RE.test(str3)); // true
console.log(RE.test("2020-12/31")); // false
```

#### 括号嵌套

以左括号（开括号）为准

```javascript
const RE = /^((\d)(\d(\d)))\1\2\3\4$/;
const str = "1231231233";

console.log(RE.test(str)); // true

str.replace(RE, (match, p2, p3, p4, p5, p6, p7) => {
  console.log(match); // 1231231233
  console.log(p2); // 123
  console.log(p3); // 1
  console.log(p4); // 23
  console.log(p5); // 3
  console.log(p6); // 0
  console.log(p7); // 3
});
```

第一个字符是数字，比如说 "1"，
第二个字符是数字，比如说 "2"，
第三个字符是数字，比如说 "3"，
接下来的是 \1，是第一个分组内容，那么看第一个开括号对应的分组是什么，是 "123"，
接下来的是 \2，找到第 2 个开括号，对应的分组，匹配的内容是 "1"，
接下来的是 \3，找到第 3 个开括号，对应的分组，匹配的内容是 "23"，
最后的是 \4，找到第 3 个开括号，对应的分组，匹配的内容是 "3"。

<img src="https://yw-dev-bucket.eos-ningbo-1.cmecloud.cn/b24bfd5b-a3f6-48e6-b827-112ab2df0acf.png">

#### \10 代表什么

\10 就是第 10 组

```javascript
const RE = /(1)(2)(3)(4)(5)(6)(7)(8)(9)(#) \10+/;
const str = "123456789# ###";

console.log(RE.test(str)); // true
```

#### 引用不存在的分组

```javascript
const RE = /\1\2\3\4\5\6/;
const str = "\1\2\3\4\5\6";

console.log(RE.test(str)); // true
```

#### 分组后面有量词

分组后面有量词的话，分组最终捕获到的数据是最后一次的匹配。

```javascript
const RE = /(\d)+/;
const str = "12345";

console.log(str.match(RE)); // [ '12345', '5', index: 0, input: '12345', groups: undefined ]

const RE1 = /(\d)+\1/;

console.log(RE1.test("123455")); // true
console.log(RE1.test("123451")); // false
```

### 非捕获括号

只想要括号最原始的功能，但不会引用它，即，既不在 API 里引用，也不在正则里反向引用。
此时可以使用非捕获括号 (?:p) 和 (?:p1|p2|p3)

```javascript
const RE = /(?:ab)+/g;
const str = "ababa,abbb,ababab";

console.log(str.match(RE)); // [ 'abab', 'ab', 'ababab' ]
```

```javascript
const RE = /study (?:javascript|regexp)/g;
const str = "study javascript,study regexp,hello,world";

console.log(str.match(RE)); // [ 'study javascript', 'study regexp' ]

const RE1 = /study javascript|regexp/g;
console.log(str.match(RE1)); // [ 'study javascript', 'regexp' ]
```

## 正则表达式的拆分

### 结构和操作符

| 结构   | 说明                                                                                                                                                                                                    |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 字面量 | 匹配一个具体字符，包括不用转义的和需要转义的。比如 a 匹配字符 "a"， 又比如 \n 匹配换行符，又比如 \. 匹配小数点。                                                                                        |
| 字符组 | 匹配一个字符，可以是多种可能之一，比如 [0-9]，表示匹配一个数字。也有 \d 的简写形式。 另外还有反义字符组，表示可以是除了特定字符之外任何一个字符，比如 [^0-9]， 表示一个非数字字符，也有 \D 的简写形式。 |
| 量词   | 表示一个字符连续出现，比如 a{1,3} 表示 "a" 字符连续出现 3 次。 另外还有常见的简写形式，比如 a+ 表示 "a" 字符连续出现至少一次。                                                                          |
| 锚     | 匹配一个位置，而不是字符。比如 ^ 匹配字符串的开头，又比如 \b 匹配单词边界， 又比如 (?=\d) 表示数字前面的位置。                                                                                          |
| 分组   | 用括号表示一个整体，比如 (ab)+，表示 "ab" 两个字符连续出现多次， 也可以使用非捕获分组 (?:ab)+。                                                                                                         |
| 分支   | 多个子表达式多选一，比如 abc \| bcd，表达式匹配 "abc" 或者 "bcd" 字符子串。 反向引用，比如 \2，表示引用第 2 个分组。                                                                                    |

| 操作符描述     | 操作符                        | 优先级 |
| -------------- | ----------------------------- | ------ |
| 转义符         | \                             | 1      |
| 括号和方括号   | (…)、(?:…)、(?=…)、(?!…)、[…] | 2      |
| 量词限定符     | {m}、{m,n}、{m,}、?、\*、+    | 3      |
| 位置和序列     | ^、$、\元字符、一般字符       | 4      |
| 管道符（竖杠） | \|                            | 5      |

### 注意要点

#### 匹配字符串整体

需要匹配 hello 或者 world

```javascript
const RE = /^(hello|world)$/;

console.log(RE.test("hello")); // true
console.log(RE.test("world")); // true

const RE1 = /^hello|world$/; // 这个正则就不正确

console.log(RE1.test("h1231231world")); // true
```

#### 量词连缀

1. 每个字符为 "a"，"b"，"c" 任选其一
2. 字符串的长度是 3 的倍数

```javascript
const RE = /([abc]{3})+/;

console.log(RE.test("aaa")); // true
console.log(RE.test("bbb")); // true
console.log(RE.test("ccc")); // true
```

#### 元字符转义

元字符：正则中有特殊含义的字符
^、$、.、\*、+、?、|、\、/、(、)、[、]、{、}、=、!、:、-

```javascript
const str = "^$.*+?|/[]{}=!:-,";
const RE = /\^\$\.\*\+\?\|\\\/\[\]\{\}\=\!\:\-\,/;

console.log(RE.test(str)); // true
```

##### 字符组中的元字符

```javascript
const str = "^$.*+?|\\/[]{}=!:-,";
const RE = /[\^$.*+?|\\/\[\]{}=!:\-,]/g;

console.log(str.match(RE)); // ["^", "$", ".", "*", "+", "?", "|", "\", "/", "[", "]", "{", "}", "=", "!", ":","-", ","]
```

##### 匹配 "[abc]" 和 "{3,5}"

```javascript
const RE1 = /\[abc]/;
const RE2 = /\[abc\]/;

console.log("[abc]".match(RE1)[0]); // "[abc]"
console.log("[abc]".match(RE2)[0]); // "[abc]"
```

```javascript
const RE1 = /\{3,5}/;
const RE2 = /\{3,5\}/;

console.log("{3,5}".match(RE1)[0]); // "{3,5}"
console.log("{3,5}".match(RE2)[0]); // "{3,5}"
```

## 案例

### 1. 匹配十六进制颜色

```javascript
const RE = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;
const str = "#ffbbad,#ddd,#fff,#FFF,#Fc01DF";

console.log(str.match(RE)); // [ '#ffbbad', '#ddd', '#fff', '#FFF', '#Fc01DF' ]
```

### 2. 匹配 24 小时时间

```javascript
// 23:59
// 09:09
// 19:59

const RE = /(([01][0-9]|2[0-3]):([0-5][0-9]))/g;
const str1 = "23:59, 00:00, 01:01";

console.log(str1.match(RE)); // [ '23:59', '00:00', '01:01' ]
```

### 3. 匹配 24 小时时间

```javascript
const RE = /((0?[0-9]|1[0-9]|2[0-3]):([1-5][0-9]|0?[0-9]))/g;
const str = "7:9";

console.log(RE.test(str)); // true
```

### 4. 匹配日期

格式 yyyy-mm-dd

```javascript
const RE = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const RE1 = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])/g;

const str1 = "2020-12-31";
const str2 = "2020-09-01";
const str3 = "2020-10-31";
const str4 = "2020-01-01";
const str5 = "2020-01-01, 2020-10-31, 2020-09-01, 2020-12-31";

console.log(RE.test(str1)); // true
console.log(RE.test(str2)); // true
console.log(RE.test(str3)); // true
console.log(RE.test(str4)); // true
console.log(str5.match(RE1)); // [ '2020-01-01', '2020-10-31', '2020-09-01', '2020-12-31' ]
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

const RE = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
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

```javascript
const RE = /(1[345789]\d{9}\b)/g;
const str = "15111655112, 15111111111111111";

console.log(str.match(RE)); // [ '15111655112' ]
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

### 11. 验证密码问题

密码长度 6-12 位，由数字、小写字符和大写字母组成，但必须至少包括 2 种字符。

```javascript
const RE = /^[a-zA-Z0-9]{6,12}$/; // 密码长度 6-12 位，由数字、小写字符和大写字母组成
const RE1 = /(?=.*[0-9])/; // 判断是否包含数字
const RE2 = /(?=.*[a-z])/; // 判断是否包含 a-z
const RE3 = /(?=.*[A-Z])/; // 判断是否包含 A-Z

// /?!^[0-9]{6,12}$/ 不能是 6-12 的纯数字
// /?!^[a-z]{6,12}$/ 不能是 6-12 的 a-z
// /?!^[A-Z]{6,12}$/ 不能是 6-12 的 A-Z

const RE4 =
  /((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z]))^[a-zA-Z0-9]{6,12}$/;

const RE5 =
  /(?!^[0-9]{6,12}$)(?!^[a-z]{6,12}$)(?!^[A-Z]{6,12}$)^[a-zA-Z0-9]{6,12}$/;

console.log(RE4.test("1234567")); // false 全是数字
console.log(RE4.test("abcdef")); // false 全是小写字母
console.log(RE4.test("ABCDEFGH")); // false 全是大写字母
console.log(RE4.test("ab23C")); // false 不足6位
console.log(RE4.test("ABCDEF234")); // true 大写字母和数字
console.log(RE4.test("abcdEF234")); // true 三者都有

console.log(RE5.test("1234567")); // false 全是数字
console.log(RE5.test("abcdef")); // false 全是小写字母
console.log(RE5.test("ABCDEFGH")); // false 全是大写字母
console.log(RE5.test("ab23C")); // false 不足6位
console.log(RE5.test("ABCDEF234")); // true 大写字母和数字
console.log(RE5.test("abcdEF234")); // true 三者都有
```

### 12. 实现 trim

去掉开头和结尾的空格

```javascript
const RE = /^\s+|\s+$/g;
const str = "  123123 ";
console.log(str.replace(RE, "")); // 123123
console.log(str.replace(RE, "").length); // 6
```

```javascript
const RE = /^\s*(.*?)\s*$/g; // (.*?) 惰性匹配任意字符
const str = "  123123 ";
console.log(str.replace(RE, "$1")); // 123123
console.log(str.replace(RE, "$1").length); // 6
```

### 13. 将每个字符的首字母都大写

```javascript
const RE = /(?:^|\s)\w/g;
const RE1 = /(^|\s)\w/g;
const str = "regular is terrible";

const res = str.toLocaleLowerCase().replace(RE, (p1) => p1.toLocaleUpperCase());
const res1 = str
  .toLocaleLowerCase()
  .replace(RE1, (p1) => p1.toLocaleUpperCase());

console.log(res); // Regular Is Terrible
console.log(res1); // Regular Is Terrible
```

### 14. 驼峰化

```javascript
const RE = /[-_\s]+(.)?/g;
const RE1 = /-(\w)/g;
const str = "on-click";

const res = str.replace(RE, (_, s) => {
  return s && s.toLocaleUpperCase();
});

const res1 = str.replace(RE1, (_, s) => {
  return s && s.toLocaleUpperCase();
});

console.log("res :>> ", res); // onClick
console.log("res1 :>> ", res1); // onClick
```

### 15. 连字符

```javascript
const RE = /\B([A-Z])/g;
const str = "onClick";
const res = str.replace(RE, (match, p1) => {
  return p1 && `-${p1.toLocaleLowerCase()}`;
});
const res1 = str.replace(RE, "-$1").toLocaleLowerCase();

console.log(res); // on-click
console.log(res1); // on-click
```

```javascript
const RE = /([A-Z])/g;
const str = "onClick";
const res = str.replace(RE, "-$1").toLocaleLowerCase();
// const res = str
//   .replace(RE, "-$1")
//   .replace(/[-_\s]+/g, "-")
//   .toLocaleLowerCase();

console.log(res); // on-click
```

### 16. 匹配成对的标签

```javascript
const RE = /<([^>]+)>[\d\D]*<\/\1>/;

const str1 = "<div>123123</div>";
const str2 = "<div>baba</div>";
const str3 = "<title>wrong!</p>";

console.log(RE.test(str1)); // true
console.log(RE.test(str2)); // true
console.log(RE.test(str3)); // false
```

### IPV4 地址

```javascript
const RE =
  /^((0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])\.){3}(0{0,2}\d|0?\d{2}|1\d{2}|2[0-4]\d|25[0-5])$/;

console.log(RE.test("192.168.1.1"));
```

### 匹配浮点数

```javascript
// 1.23、+1.23、-1.23
// 10、+10、-10
// .2、+.2、-.2
const RE = /^[+-]?(\d+\.\d+|\.\d+)$/;

console.log(RE.test("-1.1"));
console.log(RE.test("-1"));
console.log(RE.test("1"));
console.log(RE.test(".2"));
```

### demo

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <style>
    .test-img {
      width: 200px;
      height: 200px;
    }
  </style>
  <body>
    <div class="test">111</div>
    <div class="test">222</div>
    <p>333</p>
    <script src="./index.js"></script>
  </body>
</html>
```

index.js

```javascript
function getElementByClassName(className) {
  const elements = document.getElementsByTagName("*");
  const RE = new RegExp("(^|\\s)" + className + "(\\s|$)");
  let res = [];

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    if (RE.test(element.className)) res.push(element);
  }

  return res;
}

const testEl = getElementByClassName("test");

testEl.forEach((item) => {
  item.style.color = "red";
});
```

### 使用字符串保存数据

```javascript
const utils = {};

"Boolean|Number|String|Function|Array|Date|RegExp|Object|Error"
  .split("|")
  .forEach((item) => {
    utils[`is${item}`] = function (param) {
      return Object.prototype.toString.call(param).slice(8, -1) === item;
    };
  });

console.log(utils.isArray([1, 2, 3])); // true
console.log(utils.isBoolean(false)); // false
```
