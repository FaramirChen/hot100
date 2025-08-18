/**
 * 题名：LC647 回文子串（中心扩展）
 * 【输入】一行字符串 s
 * 【输出】所有回文子串的个数
 * 【方法】以每个字符/缝隙为中心扩展，统计回文数量；总中心点 2n-1 个。
 */
const fs=require('fs');
const s=fs.readFileSync(0,'utf8').trim();
const n=s.length;
function expand(l,r){ let c=0; while(l>=0&&r<n&&s[l]===s[r]){ c++; l--; r++; } return c; }
let ans=0;
for(let i=0;i<n;i++){ ans+=expand(i,i); ans+=expand(i,i+1); }
console.log(String(ans));
