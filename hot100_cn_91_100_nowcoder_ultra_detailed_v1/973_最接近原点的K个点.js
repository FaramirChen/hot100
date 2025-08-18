/**
 * 题名：LC973 最接近原点的 K 个点（快速选择）
 * 【输入】两行：
 *   第1行：点集（JSON），如 [[1,3],[-2,2],[2,-2]]
 *   第2行：k（整数）
 * 【输出】任意顺序的 k 个最近点（JSON）
 * 【说明】距离可用平方避免浮点：d = x*x + y*y。用 Quickselect 在 O(n) 均摊内找前 k 小。
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const pts=JSON.parse(lines[0]||'[]'); const k=parseInt(lines[1]||'0',10);
function dist(i){ const x=pts[i][0], y=pts[i][1]; return x*x + y*y; }
function swap(i,j){ const t=pts[i]; pts[i]=pts[j]; pts[j]=t; }
function partition(l,r,p){
  const pv=dist(p); swap(p,r);
  let i=l;
  for(let j=l;j<r;j++){ if(dist(j)<=pv){ swap(i,j); i++; } }
  swap(i,r); return i;
}
let l=0, r=pts.length-1, target=k-1;
while(l<=r){
  const p=l + Math.floor(Math.random()*(r-l+1));
  const m=partition(l,r,p);
  if(m===target) break;
  else if(m<target) l=m+1; else r=m-1;
}
console.log(JSON.stringify(pts.slice(0,k)));
