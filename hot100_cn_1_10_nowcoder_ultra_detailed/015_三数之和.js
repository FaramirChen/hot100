/**
 * 题名：LC015 三数之和（排序 + 双指针 + 去重）
 * 机考说明：
 *   - 输入：一行整数数组（JSON）
 *   - 输出：所有不重复三元组的 JSON 数组（每个三元组内部升序）
 * 算法流程：
 *   1) 排序（升序）。
 *   2) 外层枚举 i（作为第一个数），并对 i 去重（跳过与前一个相同的值）。
 *   3) 在 [i+1..n-1] 内用双指针 l、r 寻找 nums[l] + nums[r] = -nums[i]。
 *   4) 命中后同时移动 l、r，并跳过重复值以避免重复三元组。
 * 复杂度：O(n^2)，空间 O(1)（不计输出）。
 * 注意：
 *   - 需要“三层去重”：i，命中后对 l 去重，对 r 去重。
 */
const fs = require('fs');
const nums = JSON.parse(fs.readFileSync(0, 'utf8').trim());

nums.sort((a, b) => a - b);
const n = nums.length;
const ans = [];

for (let i = 0; i < n; i++) {
  // 外层 i 去重：避免以同一个值为起点重复求解
  if (i > 0 && nums[i] === nums[i - 1]) continue;

  let l = i + 1;
  let r = n - 1;
  const target = -nums[i];

  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum === target) {
      ans.push([nums[i], nums[l], nums[r]]);
      // 命中后，移动到下一组不相等的 l、r（跳过重复）
      l++; r--;
      while (l < r && nums[l] === nums[l - 1]) l++;
      while (l < r && nums[r] === nums[r + 1]) r--;
    } else if (sum < target) {
      // 和偏小，增大 l
      l++;
    } else {
      // 和偏大，减小 r
      r--;
    }
  }
}

console.log(JSON.stringify(ans));
