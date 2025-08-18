/**
 * 题名：LC300 最长递增子序列（耐心排序 + 二分 lower_bound）
 * 【输入】一行数组（JSON）
 * 【输出】LIS 长度
 */
const fs = require('fs');
const a = JSON.parse(fs.readFileSync(0, 'utf8').trim());
const tails = []; // tails[k]：长度为 k+1 的递增子序列的最小结尾值
for (const x of a) {
  let l = 0, r = tails.length;
  while (l < r) { const m = (l + r) >> 1; if (tails[m] < x) l = m + 1; else r = m; }
  tails[l] = x;
}
console.log(String(tails.length));
