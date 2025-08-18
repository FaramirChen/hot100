/**
 * 题名：LC198 打家劫舍（线性 DP）
 * 【输入】一行数组（JSON），表示每家现金
 * 【输出】最大可盗金额（整数）
 * 【转移】f[i]=max(f[i-1], f[i-2]+a[i])；用 O(1) 空间滚动。
 */
const fs=require('fs');
const a=JSON.parse(fs.readFileSync(0,'utf8').trim());
let pre2=0, pre1=0;  // f[-1]=0, f[0]=0（空集）
for(const x of a){
  const cur = Math.max(pre1, pre2 + x);
  pre2 = pre1; pre1 = cur;
}
console.log(String(pre1));
