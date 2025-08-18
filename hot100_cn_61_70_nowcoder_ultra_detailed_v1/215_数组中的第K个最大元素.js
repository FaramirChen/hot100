/**
 * 题名：LC215 数组中的第 K 个最大元素（快速选择 Quickselect）
 * 【输入】两行：第1行数组（JSON），第2行 k（整数，1 表示最大）
 * 【输出】第 k 大元素的值（整数）
 * 【说明】将“找第 k 大”转为找下标 target = n - k 的“第 k 小”，在原地分区中定位。
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const a=JSON.parse(lines[0]); const k=parseInt(lines[1],10);
const n=a.length; const target=n-k;
function swap(i,j){ const t=a[i]; a[i]=a[j]; a[j]=t; }
function partition(l,r,p){ const pv=a[p]; swap(p,r); let i=l; for(let j=l;j<r;j++){ if(a[j]<pv){ swap(i,j); i++; } } swap(i,r); return i; }
let l=0,r=n-1;
while(l<=r){
  const p = l + Math.floor(Math.random()*(r-l+1));
  const m = partition(l,r,p);
  if(m===target){ console.log(String(a[m])); process.exit(0); }
  else if(m<target) l=m+1; else r=m-1;
}
console.log(String(a[target]));
