/*
 * @Author: HxB
 * @Date: 2023-04-27 14:18:11
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 14:21:12
 * @Description: prettier 配置
 * @FilePath: \web_base\.prettierrc.js
 */

module.exports = {
  printWidth: 120, // 最大行宽
  semi: true, // 末尾是否要分号
  singleQuote: true, // 单引号
  bracketSpacing: true, // 在对象括号之间增加空格
  bracketSameLine: false, // 将多行 HTML（HTML、JSX、Vue、Angular）元素放在最后一行的末尾，而不是单独放在下一行。
  arrowParens: 'always', // 必须包含箭头函数的括号，而不是 avoid。
  insertPragma: false, // 是否插入已经被格式化的标识
  tabWidth: 2, // 缩进空格数
  useTabs: false, // 是否使用 tab 缩进
  endOfLine: 'crlf', // 行尾换行符
  trailingComma: 'all', // 尽可能使用尾随逗号，结尾处不加逗号 none。
  htmlWhitespaceSensitivity: 'ignore', // 忽略 '>' 下落问题
};
