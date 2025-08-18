/**
 * 题名：LC581 最短无序连续子数组
 * 【输入】一行数组（JSON）
 * 【输出】最短需要排序的连续子数组长度
 * 【方法】
 *  - 从左到右维护当前最大值 maxSeen，凡是 a[i] < maxSeen 的位置都可能需要包含进右边界 right；
 *  - 从右到左维护当前最小值 minSeen，凡是 a[i] > minSeen 的位置都可能需要包含进左边界 left；
 *  - 若数组已有序，返回 0。
 */
const fs=require('fs');
const a=JSON.parse(fs.readFileSync(0,'utf8').trim());
const n=a.length;
let maxSeen=-Infinity, right=-1;
for(let i=0;i<n;i++){ if(a[i] < maxSeen) right=i; else if(a[i]>maxSeen) maxSeen=a[i]; }
let minSeen=Infinity, left=-1;
for(let i=n-1;i>=0;i--){ if(a[i] > minSeen) left=i; else if(a[i]<minSeen) minSeen=a[i]; }
const len = right===-1 ? 0 : (right - left + 1);
console.log(String(len));
