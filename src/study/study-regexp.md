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
