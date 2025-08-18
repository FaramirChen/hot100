/**
 * 题名：LC005 最长回文子串（中心扩展法）
 * 机考说明：
 *   - 输入：一行字符串 s
 *   - 输出：最长回文子串（若有多个，返回任何一个）
 * 核心思想：
 *   - 回文以“中心”为对称轴进行扩展：
 *       奇数长度中心：i
 *       偶数长度中心：i 与 i+1
 *   - 从中心向两侧不断比较 s[l] 与 s[r]，相等则继续扩展。
 *   - 遍历所有可能中心，记录最长区间。
 * 复杂度：最坏 O(n^2)，空间 O(1)。n<=2000 时完全可接受。
 */
const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim();

/**
 * 从 [l, r] 作为“当前中心”开始向两侧扩展，直到不回文为止；
 * 返回扩展后的“最大回文区间”的左右端点（闭区间）。
 */
function expand(l, r) {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;  // 左移左指针
    r++;  // 右移右指针
  }
  // 此时 [l+1, r-1] 是最后一个合法回文区间
  return [l + 1, r - 1];
}

let bestL = 0, bestR = 0; // 记录最长回文子串的左右端点（闭区间）

for (let i = 0; i < s.length; i++) {
  // 1) 以 i 为中心（奇数回文）
  let [l1, r1] = expand(i, i);
  if (r1 - l1 > bestR - bestL) {
    bestL = l1; bestR = r1;
  }

  // 2) 以 (i, i+1) 为中心（偶数回文）
  let [l2, r2] = expand(i, i + 1);
  if (r2 - l2 > bestR - bestL) {
    bestL = l2; bestR = r2;
  }
}

// slice 的右端为“开区间”，因此需要 bestR + 1
console.log(s.slice(bestL, bestR + 1));
