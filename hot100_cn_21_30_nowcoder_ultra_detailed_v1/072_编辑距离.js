/**
 * 题名：LC072 编辑距离（经典 DP）
 * 【输入】两行：第1行 word1，第2行 word2
 * 【输出】将 word1 转换为 word2 所需的最少操作数（插入、删除、替换）
 * 【定义】dp[i][j] = 把 word1 前 i 个字符转换为 word2 前 j 个字符的最少操作数
 * 【转移】
 *   - 若 word1[i-1] == word2[j-1]：dp[i][j] = dp[i-1][j-1]
 *   - 否则：dp[i][j] = 1 + min(
 *       dp[i-1][j],   // 删除 word1[i-1]
 *       dp[i][j-1],   // 插入 word2[j-1] 到 word1
 *       dp[i-1][j-1]  // 替换 word1[i-1] -> word2[j-1]
 *     )
 * 【复杂度】O(mn) 时间与空间。
 */
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
const s = lines[0] ?? '';
const t = lines[1] ?? '';
const m = s.length, n = t.length;
// 使用 (m+1) x (n+1) 的二维 DP 表
const dp = Array.from({length: m+1}, () => Array(n+1).fill(0));
// 边界：把空串变成另一个串，需要插入/删除这么多次
for(let i=1;i<=m;i++) dp[i][0] = i;  // 全删
for(let j=1;j<=n;j++) dp[0][j] = j;  // 全插
for(let i=1;i<=m;i++){
  for(let j=1;j<=n;j++){
    if(s[i-1] === t[j-1]) dp[i][j] = dp[i-1][j-1];
    else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  }
}
console.log(String(dp[m][n]));
