/**
 * 题名：LC283 移动零（双指针原地稳定）
 * 【输入】一行数组（JSON），如：[0,1,0,3,12]
 * 【输出】将所有 0 移动到末尾后的数组（JSON），相对顺序保持不变
 * 【复杂度】O(n) 时间，O(1) 额外空间
 */
const fs = require('fs');
const a = JSON.parse(fs.readFileSync(0, 'utf8').trim());
let slow = 0; // 指向下一个非 0 应放的位置
for (let fast = 0; fast < a.length; fast++) {
  if (a[fast] !== 0) {
    if (slow !== fast) { const t = a[slow]; a[slow] = a[fast]; a[fast] = t; }
    slow++;
  }
}
console.log(JSON.stringify(a));
