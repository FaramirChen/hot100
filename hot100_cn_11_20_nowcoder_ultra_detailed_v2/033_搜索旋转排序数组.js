/**
 * 题名：LC033 搜索旋转排序数组（二分）
 * 【输入】第1行旋转后数组（JSON，互不相同）；第2行 target
 * 【输出】target 下标或 -1
 * 【要点】任一时刻，区间的一半必有序；判断 target 是否落在有序半边内。
 */
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
const a = JSON.parse(lines[0]);
const t = parseInt(lines[1], 10);

let l = 0, r = a.length - 1;
while (l <= r) {
  const m = (l + r) >> 1;
  if (a[m] === t) { console.log(String(m)); process.exit(0); }
  if (a[l] <= a[m]) {                 // 左半有序
    if (a[l] <= t && t < a[m]) r = m - 1;
    else l = m + 1;
  } else {                            // 右半有序
    if (a[m] < t && t <= a[r]) l = m + 1;
    else r = m - 1;
  }
}
console.log('-1');
