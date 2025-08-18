/**
 * 题名：LC322 零钱兑换（完全背包）
 * 【输入】两行：第1行硬币数组（JSON），第2行金额 amount（整数）
 * 【输出】最少硬币数；无法凑出返回 -1
 */
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
const coins = JSON.parse(lines[0] || '[]');
const amount = parseInt(lines[1] || '0', 10);
const INF = 1e15;
const dp = Array(amount + 1).fill(INF); dp[0] = 0;
for (const c of coins) {
  for (let x = c; x <= amount; x++) {
    if (dp[x - c] + 1 < dp[x]) dp[x] = dp[x - c] + 1;
  }
}
console.log(String(dp[amount] === INF ? -1 : dp[amount]));
