/**
 * 题名：LC347 前 K 个高频元素（哈希 + 小根堆）
 * 【输入】两行：第1行数组（JSON），第2行整数 k
 * 【输出】任意顺序输出出现频率最高的 k 个元素（JSON）
 */
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
const nums = JSON.parse(lines[0] || '[]'); const k = parseInt(lines[1] || '0', 10);
const cnt = new Map(); for (const x of nums) cnt.set(x, (cnt.get(x) || 0) + 1);
class MinHeap {
  constructor(){ this.a = []; }
  size(){ return this.a.length; }
  push(x){ this.a.push(x); this._up(this.a.length - 1); }
  pop(){ const n=this.a.length; if(!n) return null; const top=this.a[0]; const last=this.a.pop(); if(n>1){ this.a[0]=last; this._down(0); } return top; }
  _up(i){ while(i>0){ const p=(i-1)>>1; if(this.a[p][0] <= this.a[i][0]) break; [this.a[p], this.a[i]]=[this.a[i], this.a[p]]; i=p; } }
  _down(i){ const n=this.a.length; while(true){ let l=i*2+1, r=l+1, m=i; if(l<n && this.a[l][0]<this.a[m][0]) m=l; if(r<n && this.a[r][0]<this.a[m][0]) m=r; if(m===i) break; [this.a[m], this.a[i]]=[this.a[i], this.a[m]]; i=m; } }
}
const h = new MinHeap();
for (const [val, f] of cnt) { h.push([f, val]); if (h.size() > k) h.pop(); }
const out = []; while (h.size()) out.push(h.pop()[1]);
console.log(JSON.stringify(out.reverse()));
