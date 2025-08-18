/**
 * 题名：LC221 最大正方形（DP，1D 滚动）
 * 【输入】一行矩阵（JSON），可为 ['10100','10111','11111','10010'] 或 二维字符/数字数组
 * 【输出】只含 '1' 的最大正方形的面积（整数）
 * 【转移】dp[j] 表示当前行、到列 j 的“最大正方形边长”；
 *   新的 dp[j] = min(左 dp[j-1], 上 old_dp[j], 左上 old_dp[j-1]) + 1（当该格为 '1' 时），否则为 0。
 */
const fs=require('fs');
let mat=JSON.parse(fs.readFileSync(0,'utf8').trim());
if(mat.length===0){ console.log('0'); process.exit(0); }
// 统一为字符 '0'/'1'
if(typeof mat[0] === 'string'){ mat = mat.map(row=>row.split('')); }
else if(typeof mat[0][0] === 'number'){ mat = mat.map(row=>row.map(x=>x? '1':'0')); }
const m=mat.length, n=mat[0].length;
let dp=Array(n+1).fill(0), best=0; // 多开一列便于处理左上
for(let i=1;i<=m;i++){
  let prevDiag=0;  // old_dp[j-1]
  for(let j=1;j<=n;j++){
    const tmp = dp[j]; // old_dp[j]
    if(mat[i-1][j-1]==='1'){
      dp[j] = Math.min(dp[j], dp[j-1], prevDiag) + 1;
      if(dp[j]>best) best=dp[j];
    }else dp[j]=0;
    prevDiag = tmp;
  }
}
console.log(String(best*best));
