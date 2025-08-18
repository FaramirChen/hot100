/**
 * 题名：LC003 无重复字符的最长子串（滑动窗口 / 双指针）
 * 机考说明：
 *   - 输入：一行字符串 s
 *   - 输出：一个整数，表示最长不含重复字符的子串长度
 * 核心思想：
 *   - 使用窗口 [L..R]，保持窗口内所有字符都“互不相同”。
 *   - lastMap 记录每个字符“最近一次出现的位置”。当 s[R] 在窗口内重复时，移动 L 跳过重复位置。
 * 正确性不变式：
 *   - 每次循环结束后，[L..R] 都没有重复字符；答案为当前窗口最大值。
 * 复杂度：时间 O(n)，空间 O(k)（k 为字符集大小）。
 */
const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim();

// lastMap: Map<char, number> 记录字符最近一次出现的下标
const lastMap = new Map();
let L = 0;     // 窗口左端（包含）
let best = 0;  // 记录最大窗口长度

for (let R = 0; R < s.length; R++) {
  const ch = s[R];
  // 如果 ch 在窗口内出现过（即最近一次位置 >= L），则把 L 移动到“该位置+1”后面，
  // 保证窗口内不再包含重叠的 ch
  if (lastMap.has(ch) && lastMap.get(ch) >= L) {
    L = lastMap.get(ch) + 1;
  }
  // 更新 ch 最近一次出现的位置为 R
  lastMap.set(ch, R);
  // 更新答案：当前窗口长度 = R - L + 1
  best = Math.max(best, R - L + 1);
}

console.log(String(best));
