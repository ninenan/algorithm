# validate-npm-package-name

> [源码地址](https://github.com/npm/validate-npm-package-name/blob/main/index.js)

> [builtins](https://github.com/juliangruber/builtins/blob/master/index.js)

```javascript
"use strict";

var scopedPackagePattern = new RegExp("^(?:@([^/]+?)[/])?([^/]+?)$");
var builtins = require("builtins");
var blacklist = ["node_modules", "favicon.ico"];

var validate = (module.exports = function (name) {
  var warnings = [];
  var errors = [];

  // 不能是 null
  if (name === null) {
    errors.push("name cannot be null");
    return done(warnings, errors);
  }

  // 不能是 undefined
  if (name === undefined) {
    errors.push("name cannot be undefined");
    return done(warnings, errors);
  }

  // 必须是 字符串
  if (typeof name !== "string") {
    errors.push("name must be a string");
    return done(warnings, errors);
  }

  // 长度不能为 0
  if (!name.length) {
    errors.push("name length must be greater than zero");
  }

  // 不能以 . 开头
  if (name.match(/^\./)) {
    errors.push("name cannot start with a period");
  }

  // 不能以 _ 开头
  if (name.match(/^_/)) {
    errors.push("name cannot start with an underscore");
  }

  // 首尾不能有空格
  if (name.trim() !== name) {
    errors.push("name cannot contain leading or trailing spaces");
  }

  // 包名不能和黑名单保持一致
  // No funny business
  blacklist.forEach(function (blacklistedName) {
    if (name.toLowerCase() === blacklistedName) {
      errors.push(blacklistedName + " is a blacklisted name");
    }
  });

  // Generate warnings for stuff that used to be allowed

  // builtins 主要是 node 的内置模块，包名不能和 node 的内置模块的名称一致
  // core module names like http, events, util, etc
  builtins.forEach(function (builtin) {
    if (name.toLowerCase() === builtin) {
      warnings.push(builtin + " is a core module name");
    }
  });

  // really-long-package-names-------------------------------such--length-----many---wow
  // the thisisareallyreallylongpackagenameitshouldpublishdowenowhavealimittothelengthofpackagenames-poch.
  // 不能超过 214 个字符
  if (name.length > 214) {
    warnings.push("name can no longer contain more than 214 characters");
  }

  // 必须是小写
  // mIxeD CaSe nAMEs
  if (name.toLowerCase() !== name) {
    warnings.push("name can no longer contain capital letters");
  }

  // 不能包含 "~\'!()*" 这些特殊字符
  if (/[~'!()*]/.test(name.split("/").slice(-1)[0])) {
    warnings.push('name can no longer contain special characters ("~\'!()*")');
  }

  if (encodeURIComponent(name) !== name) {
    // Maybe it's a scoped package name, like @user/package

    // 假设包名是 @vue/core
    // 那么 nameMatch 就是 ['@vue/core', 'vue', 'core']
    var nameMatch = name.match(scopedPackagePattern);
    if (nameMatch) {
      var user = nameMatch[1];
      var pkg = nameMatch[2];
      if (
        encodeURIComponent(user) === user &&
        encodeURIComponent(pkg) === pkg
      ) {
        return done(warnings, errors);
      }
    }

    errors.push("name can only contain URL-friendly characters");
  }

  return done(warnings, errors);
});

validate.scopedPackagePattern = scopedPackagePattern;

// 返回结果
var done = function (warnings, errors) {
  var result = {
    validForNewPackages: errors.length === 0 && warnings.length === 0,
    validForOldPackages: errors.length === 0,
    warnings: warnings,
    errors: errors,
  };
  if (!result.warnings.length) delete result.warnings;
  if (!result.errors.length) delete result.errors;
  return result;
};
```

## 有效的包名

```javascript
var validate = require("validate-npm-package-name");

validate("some-package");
validate("example.com");
validate("under_score");
validate("123numeric");
validate("@npm/thingy");
validate("@jane/foo.js");

// 有效的话 会返回下面的内容
{
  validForNewPackages: true,
  validForOldPackages: true
}
```

## 无效的包名

```javascript
validate("excited!")
validate(" leading-space:and:weirdchars")

// 无效的话 会返回下面的内容
{
  validForNewPackages: false,
  validForOldPackages: false,
  errors: [
    'name cannot contain leading or trailing spaces',
    'name can only contain URL-friendly characters'
  ]
}
```

## 总结

1. 包名必须是字符串
2. 包名不能以 . 或者 \_ 开头
3. 包名首尾不能有空格
4. 包名不能和 node 的内置模块名称一致
5. 包名不能是 node_modules 或者 favicon.ico
6. 包名长度最长 214
7. 包名不能含有 "~\'!()\*" 这些特殊字符
8. 包名不能包含 non-url-safe 字符
