/**
 * 题名：LC031 下一个排列（字典序）
 * 【输入】一行数组（JSON）
 * 【输出】就地变为下一个字典序排列后的数组（JSON）
 * 【步骤】
 *   1) 从右向左找到第一个 nums[p] < nums[p+1] 的位置 p；若不存在，整体反转并返回。
 *   2) 从右向左找到第一个 > nums[p] 的位置 q，交换 nums[p], nums[q]；
 *   3) 反转 [p+1..]，得到最小后缀。
 */
const fs = require('fs');
const nums = JSON.parse(fs.readFileSync(0, 'utf8').trim());

let p = nums.length - 2;
while (p >= 0 && nums[p] >= nums[p + 1]) p--;

function reverse(l, r){ while(l<r){ [nums[l], nums[r]]=[nums[r], nums[l]]; l++; r--; } }

if (p < 0) {
  reverse(0, nums.length - 1);
  console.log(JSON.stringify(nums));
  process.exit(0);
}

let q = nums.length - 1;
while (nums[q] <= nums[p]) q--;
[nums[p], nums[q]] = [nums[q], nums[p]];
reverse(p + 1, nums.length - 1);

console.log(JSON.stringify(nums));
