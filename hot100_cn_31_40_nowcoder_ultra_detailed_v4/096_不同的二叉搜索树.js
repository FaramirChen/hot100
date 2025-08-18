/**
 * 题名：LC096 不同的二叉搜索树（Catalan DP）
 * 【输入】一行 n
 * 【输出】形态数
 */
const fs=require('fs');
const n=parseInt(fs.readFileSync(0,'utf8').trim(),10);
const G=Array(n+1).fill(0); G[0]=1; if(n>=1) G[1]=1;
for(let nodes=2; nodes<=n; nodes++){
  let ways=0; for(let root=1; root<=nodes; root++){ ways += G[root-1]*G[nodes-root]; }
  G[nodes]=ways;
}
console.log(String(G[n]));
