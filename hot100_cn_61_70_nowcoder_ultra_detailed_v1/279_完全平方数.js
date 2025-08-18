/**
 * 题名：LC279 完全平方数（DP）
 * 【输入】一行整数 n
 * 【输出】最少由多少个完全平方数组成 n（例如 12=4+4+4 -> 3）
 * 【转移】dp[x] = 1 + min(dp[x - s]) for all s in squares <= x；dp[0]=0。
 * 【复杂度】O(n * sqrt(n))。
 */
const fs=require('fs');
const n=parseInt(fs.readFileSync(0,'utf8').trim(),10);
const squares=[]; for(let i=1;i*i<=n;i++) squares.push(i*i);
const dp=Array(n+1).fill(Infinity); dp[0]=0;
for(let x=1;x<=n;x++){
  for(const s of squares){
    if(s>x) break;
    const cand = dp[x-s] + 1;
    if(cand < dp[x]) dp[x]=cand;
  }
}
console.log(String(dp[n]));
