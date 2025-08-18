/**
 * 题名：LC076 最小覆盖子串（滑动窗口）
 * 【输入】两行：s、t
 * 【输出】s 中包含 t 所有字符（含频次）的最短子串；不存在返回空串
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const s=lines[0]||'', t=lines[1]||'';
if(!t){ console.log(''); process.exit(0); }
const need=new Map(); for(const ch of t) need.set(ch,(need.get(ch)||0)+1);
const win=new Map(); let have=0, needKinds=need.size;
let bestLen=Infinity, bestL=0; let L=0;
for(let R=0; R<s.length; R++){
  const c=s[R];
  if(need.has(c)){ win.set(c,(win.get(c)||0)+1); if(win.get(c)===need.get(c)) have++; }
  while(have===needKinds){
    if(R-L+1<bestLen){ bestLen=R-L+1; bestL=L; }
    const d=s[L];
    if(need.has(d)){
      win.set(d,win.get(d)-1);
      if(win.get(d)<need.get(d)) have--;
    }
    L++;
  }
}
console.log(bestLen===Infinity? '' : s.slice(bestL,bestL+bestLen));
