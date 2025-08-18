/**
 * 题名：LC070 爬楼梯（DP / 斐波那契数列）
 * 【输入】一行整数 n（台阶数）
 * 【输出】到达第 n 阶的方法数（每次可以爬 1 或 2 阶）
 * 【转移】f(n) = f(n-1) + f(n-2)；边界：f(0)=1, f(1)=1。
 * 【实现】用 O(1) 空间滚动。
 */
const fs = require('fs');
const n = parseInt(fs.readFileSync(0, 'utf8').trim(), 10);
if(n<=1){ console.log(''+1); process.exit(0); }
let a=1, b=1;              // f(0)=1, f(1)=1
for(let i=2;i<=n;i++){     // 从2到n
  const c=a+b; a=b; b=c;
}
console.log(String(b));
