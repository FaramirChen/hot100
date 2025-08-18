/**
 * 题名：LC394 字符串解码（栈）
 * 【输入】一行字符串 s，形如 "3[a2[c]]"、"2[abc]3[cd]ef"
 * 【输出】解码后的字符串
 */
const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim();
const numSt = [], strSt = [];
let curNum = 0, curStr = '';
for (const ch of s) {
  if (ch >= '0' && ch <= '9') curNum = curNum * 10 + (ch.charCodeAt(0) - 48);
  else if (ch === '[') { numSt.push(curNum); strSt.push(curStr); curNum = 0; curStr = ''; }
  else if (ch === ']') { const k = numSt.pop(), prev = strSt.pop(); curStr = prev + curStr.repeat(k); }
  else curStr += ch;
}
console.log(curStr);
