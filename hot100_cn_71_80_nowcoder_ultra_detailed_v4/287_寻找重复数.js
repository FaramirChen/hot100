/**
 * 题名：LC287 寻找重复数（Floyd 判环找入口）
 * 【输入】一行数组（JSON），长度 n+1，数值在 1..n
 * 【输出】重复的那个数
 * 【思路】把数组视为函数 f(i)=a[i]，从 0 出发会形成入环链；入环点即重复值。
 */
const fs = require('fs');
const a = JSON.parse(fs.readFileSync(0, 'utf8').trim());
let slow = a[0], fast = a[a[0]];               // 相遇阶段
while (slow !== fast) { slow = a[slow]; fast = a[a[fast]]; }
fast = 0;                                      // 入环点
while (slow !== fast) { slow = a[slow]; fast = a[fast]; }
console.log(String(slow));
