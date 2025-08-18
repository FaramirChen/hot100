/**
 * 题名：LC152 乘积最大子数组（动态规划：维护最大/最小）
 * 【输入】一行数组（JSON）
 * 【输出】最大乘积（整数/可能很大，JS 数值范围内）
 * 【要点】负数会使最大最小交换；
 *   用 imax/imin 表示以当前 i 结尾的最大/最小乘积。
 */
const fs=require('fs');
const a=JSON.parse(fs.readFileSync(0,'utf8').trim());
let imax=a[0], imin=a[0], best=a[0];
for(let i=1;i<a.length;i++){
  const x=a[i];
  if(x<0){ const t=imax; imax=imin; imin=t; }
  imax=Math.max(x, imax*x);
  imin=Math.min(x, imin*x);
  best=Math.max(best, imax);
}
console.log(String(best));
