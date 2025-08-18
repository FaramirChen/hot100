/**
 * 题名：LC438 找到字符串中所有字母异位词（滑动窗口）
 * 【输入】两行：第1行 s；第2行 p
 * 【输出】所有起始下标数组（JSON）
 * 【思路】固定窗口大小 |p|；窗口内计数与目标计数一致即记录起点。
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const s=(lines[0]||'').trim(), p=(lines[1]||'').trim();
const m=p.length, n=s.length;
if(m>n){ console.log('[]'); process.exit(0); }
const need=new Array(26).fill(0), win=new Array(26).fill(0);
const A='a'.charCodeAt(0);
for(const ch of p) need[ch.charCodeAt(0)-A]++;
const out=[];
for(let i=0;i<n;i++){
  win[s.charCodeAt(i)-A]++;
  if(i>=m) win[s.charCodeAt(i-m)-A]--;
  // 比较计数（26 维比较，常数）
  if(i>=m-1){
    let same=true;
    for(let k=0;k<26;k++){ if(win[k]!==need[k]){ same=false; break; } }
    if(same) out.push(i-m+1);
  }
}
console.log(JSON.stringify(out));
