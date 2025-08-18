/**
 * 题名：LC011 盛最多水的容器（双指针）
 * 机考说明：
 *   - 输入：一行非负整数数组（JSON），每个元素代表竖线高度
 *   - 输出：一个整数，为能装水的最大面积
 * 关键推导：
 *   - 面积 = min(h[i], h[j]) * (j - i)。宽度随 i、j 的收敛而减小。
 *   - 若 h[i] < h[j]，此时 min = h[i]；移动 j 只会减小宽度且不增加短板，必然不优。
 *   - 故每一步移动“较短的一侧”，以期提高短板高度，才有可能得到更大面积。
 * 复杂度：时间 O(n)，空间 O(0)。
 */
const fs = require('fs');
const h = JSON.parse(fs.readFileSync(0, 'utf8').trim());

let i = 0;                // 左指针
let j = h.length - 1;     // 右指针
let best = 0;             // 记录最大面积

while (i < j) {
  // 当前桶的短板高度
  const height = Math.min(h[i], h[j]);
  const width  = j - i;
  best = Math.max(best, height * width);

  // 移动短板一侧
  if (h[i] < h[j]) i++;
  else j--;
}

console.log(String(best));
