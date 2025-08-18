/**
 * 题名：LC053 最大子数组和（Kadane 动态规划）
 * 【输入】一行整数数组（JSON）
 * 【输出】最大连续子数组和（整数）
 * 【转移】
 *   dp[i] = 以 i 结尾的最大和 = max(nums[i], dp[i-1] + nums[i])
 *   答案为 max(dp[i])；实现可用滚动变量 cur。
 * 【复杂度】O(n) 时间，O(1) 空间。
 */
const fs = require('fs');
const a = JSON.parse(fs.readFileSync(0, 'utf8').trim());
let cur = -Infinity;   // 以当前下标结尾的最大和
let best = -Infinity;  // 全局最大
for(const x of a){
  cur = Math.max(x, cur + x);
  best = Math.max(best, cur);
}
console.log(String(best));
