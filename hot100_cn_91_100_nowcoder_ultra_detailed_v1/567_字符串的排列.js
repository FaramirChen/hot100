/**
 * 题名：LC567 字符串的排列（滑动窗口）
 * 【输入】两行：第1行 s1；第2行 s2
 * 【输出】true/false，s2 是否包含 s1 的某个排列（子串）
 * 【做法】固定窗口长度 |s1|，比较 26 维计数是否相等；使用滑动窗口 O(n)。
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const s1=(lines[0]||'').trim(), s2=(lines[1]||'').trim();
const m=s1.length, n=s2.length;
if(m>n){ console.log('false'); process.exit(0); }
const cnt1=new Array(26).fill(0), cnt2=new Array(26).fill(0);
const A='a'.charCodeAt(0);
for(const ch of s1) cnt1[ch.charCodeAt(0)-A]++;
for(let i=0;i<m;i++) cnt2[s2.charCodeAt(i)-A]++;
function eq(a,b){ for(let i=0;i<26;i++) if(a[i]!==b[i]) return false; return true; }
if(eq(cnt1,cnt2)){ console.log('true'); process.exit(0); }
for(let i=m;i<n;i++){
  cnt2[s2.charCodeAt(i)-A]++;
  cnt2[s2.charCodeAt(i-m)-A]--;
  if(eq(cnt1,cnt2)){ console.log('true'); process.exit(0); }
}
console.log('false');
