/**
 * 题名：LC494 目标和（转化为子集和计数）
 * 【输入】两行：第1行数组 nums（JSON，元素非负）；第2行 target（整数，可正可负）
 * 【输出】方法数（使得 ±nums[i] 求和为 target 的方案数量）
 * 【转化】设正号子集和为 P，总和为 S，则 P - (S-P) = target => P = (S + target)/2；
 *        若 S+target 为奇数或 P<0，则无解 0；否则统计“选数凑出恰好 P 的方案数”。
 * 【注意】nums 含 0 时，dp 会自然统计到（0 的选择与否不改变和，但会翻倍）。
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const nums=JSON.parse(lines[0]||'[]');
const target=parseInt(lines[1]||'0',10);
const S=nums.reduce((a,b)=>a+b,0);
const sum2=S+target;
if(sum2<0 || (sum2&1)){ console.log('0'); process.exit(0); }
const P = sum2>>1;
const dp=Array(P+1).fill(0); dp[0]=1;
for(const x of nums){
  for(let v=P; v>=x; v--){
    dp[v]+=dp[v-x];
  }
}
console.log(String(dp[P]));
