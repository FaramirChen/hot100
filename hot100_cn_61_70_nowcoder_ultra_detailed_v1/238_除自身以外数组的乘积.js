/**
 * 题名：LC238 除自身以外数组的乘积（前缀积 * 后缀积）
 * 【输入】一行数组（JSON）
 * 【输出】结果数组（JSON），res[i] = 所有 j!=i 的乘积（不使用除法，O(1) 额外空间）
 */
const fs=require('fs');
const a=JSON.parse(fs.readFileSync(0,'utf8').trim());
const n=a.length; const res=new Array(n).fill(1);
// 左侧前缀
let pre=1; for(let i=0;i<n;i++){ res[i]=pre; pre*=a[i]; }
// 右侧后缀
let suf=1; for(let i=n-1;i>=0;i--){ res[i]*=suf; suf*=a[i]; }
console.log(JSON.stringify(res));
