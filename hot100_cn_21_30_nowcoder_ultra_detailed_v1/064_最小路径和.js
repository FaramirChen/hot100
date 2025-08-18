/**
 * 题名：LC064 最小路径和（DP）
 * 【输入】一行 m×n 网格（JSON），grid[i][j] 为非负权值
 * 【输出】从左上到右下，只能右或下的最小路径和
 * 【转移】
 *   dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])（考虑边界）
 *   这里用 1D 滚动：dp[j] 表示当前行到 j 的最小和。
 */
const fs = require('fs');
const g = JSON.parse(fs.readFileSync(0, 'utf8').trim());
const m = g.length, n = g[0].length;
const dp = Array(n).fill(0);
for(let i=0;i<m;i++){
  for(let j=0;j<n;j++){
    if(i===0 && j===0) dp[j]=g[0][0];
    else if(i===0) dp[j]=dp[j-1]+g[i][j];          // 第一行：只能从左来
    else if(j===0) dp[j]=dp[j]+g[i][j];            // 第一列：只能从上来（dp[j] 仍是上一行的值）
    else dp[j]=Math.min(dp[j], dp[j-1])+g[i][j];   // 上/左二选小
  }
}
console.log(String(dp[n-1]));
