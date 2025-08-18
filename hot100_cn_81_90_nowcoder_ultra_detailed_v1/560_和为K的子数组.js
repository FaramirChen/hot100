/**
 * 题名：LC560 和为 K 的子数组（前缀和 + 哈希计数）
 * 【输入】两行：第1行数组（JSON，可含负数）；第2行 k（整数）
 * 【输出】子数组和等于 k 的个数
 * 【思路】pre[i] 为前缀和；对于当前位置 pre，答案 += 出现过的 pre-k 的次数。
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const nums=JSON.parse(lines[0]||'[]'); const k=parseInt(lines[1]||'0',10);
let pre=0, ans=0; const mp=new Map(); mp.set(0,1);
for(const x of nums){
  pre+=x;
  ans += (mp.get(pre - k) || 0);
  mp.set(pre, (mp.get(pre)||0)+1);
}
console.log(String(ans));
