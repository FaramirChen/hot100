/**
 * 题名：LC062 不同路径（DP）
 * 【输入】两行：第1行 m（行数），第2行 n（列数）
 * 【输出】从左上角到右下角，只能向右或向下走的路径条数（整数）
 * 【转移】dp[j] = dp[j] + dp[j-1]（从上方 + 从左侧）
 * 【初始化】第一行/第一列的路径数均为 1；用一维 dp 初始化为全 1 即可。
 */
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
const m = parseInt(lines[0],10), n = parseInt(lines[1],10);
const dp = Array(n).fill(1);    // 第1行全为 1
for(let i=1;i<m;i++){           // 从第2行开始
  for(let j=1;j<n;j++){         // 从第2列开始
    dp[j] = dp[j] + dp[j-1];    // 上方 dp[j] + 左侧 dp[j-1]
  }
}
console.log(String(dp[n-1]));
