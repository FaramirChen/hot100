/**
 * 题名：LC139 单词拆分（DP）
 * 【输入】两行：第1行 s（字符串）；第2行词典（JSON 字符串数组）
 * 【输出】true/false，表示 s 能否被词典中的单词空格分割
 * 【转移】dp[i]=存在 j<i，使得 dp[j]=true 且 s[j..i-1] 在词典中；dp[0]=true。
 * 【优化】可记录词典中单词的最短/最长长度，枚举 j 时限缩范围。
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const s=(lines[0]||'').trim();
const dict=JSON.parse(lines[1]||'[]');
const set=new Set(dict);
let minL=Infinity, maxL=0; for(const w of dict){ const L=w.length; if(L<minL) minL=L; if(L>maxL) maxL=L; }
if(!s){ console.log('true'); process.exit(0); }
const n=s.length; const dp=Array(n+1).fill(false); dp[0]=true;
for(let i=1;i<=n;i++){
  // 只需检查 [i-maxL, i-minL] 的 j
  const start = Math.max(0, i - maxL), end = i - minL;
  for(let j=end; j>=start; j--){
    if(dp[j] && set.has(s.slice(j,i))){ dp[i]=true; break; }
  }
}
console.log(dp[n]?'true':'false');
