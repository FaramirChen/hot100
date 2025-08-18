/**
 * 题名：LC034 在排序数组中查找元素的第一个和最后一个位置（双二分）
 * 【输入】第1行升序数组（JSON）；第2行 target
 * 【输出】[first, last] 或 [-1, -1]
 * 【方法】L = lower_bound(target); R = upper_bound(target)-1；检查 a[L] 与 a[R] 是否为 target。
 */
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
const a = JSON.parse(lines[0]);
const t = parseInt(lines[1], 10);

function lowerBound(x){ let l=0,r=a.length; while(l<r){ const m=(l+r)>>1; if(a[m]<x) l=m+1; else r=m; } return l; }
function upperBound(x){ let l=0,r=a.length; while(l<r){ const m=(l+r)>>1; if(a[m]<=x) l=m+1; else r=m; } return l; }

const L = lowerBound(t);
const R = upperBound(t) - 1;

if (L <= R && a[L] === t && a[R] === t) console.log(JSON.stringify([L, R]));
else console.log(JSON.stringify([-1, -1]));
