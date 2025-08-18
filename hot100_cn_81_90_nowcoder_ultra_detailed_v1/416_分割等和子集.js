/**
 * 题名：LC416 分割等和子集（0/1 背包判断）
 * 【输入】一行数组（JSON），如：[1,5,11,5]
 * 【输出】true/false，是否可以分割成两个和相等的子集
 * 【要点】总和 sum 若为奇数直接 false；目标 = sum/2；
 *        用 0/1 背包判断能否恰好凑出目标值（布尔 DP）。
 * 【复杂度】O(n*sum)；由于 sum/2 ≤ 100*200?（Hot100常规规模），可通过。
 */
const fs=require('fs');
const nums=JSON.parse(fs.readFileSync(0,'utf8').trim());
const sum=nums.reduce((a,b)=>a+b,0);
if(sum%2===1){ console.log('false'); process.exit(0); }
const target=sum>>1;
const dp=Array(target+1).fill(false); dp[0]=true;
for(const x of nums){
  for(let v=target; v>=x; v--){
    if(dp[v-x]) dp[v]=true;
  }
}
console.log(dp[target]?'true':'false');
