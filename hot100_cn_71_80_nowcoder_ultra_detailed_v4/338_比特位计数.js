/**
 * 题名：LC338 比特位计数（DP）
 * 【输入】一行整数 n
 * 【输出】长度为 n+1 的数组（JSON），第 i 项为 i 的二进制中 1 的个数
 */
const fs = require('fs');
const n = parseInt(fs.readFileSync(0, 'utf8').trim(), 10);
const f = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) f[i] = f[i >> 1] + (i & 1);
console.log(JSON.stringify(f));
