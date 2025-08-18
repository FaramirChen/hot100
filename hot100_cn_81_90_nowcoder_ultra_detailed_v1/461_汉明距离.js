/**
 * 题名：LC461 汉明距离（异或 + 计比特）
 * 【输入】一行两个整数，空格分隔或换行分隔，表示 x y
 * 【输出】x 与 y 的二进制表示不同位的个数
 */
const fs=require('fs');
const parts=fs.readFileSync(0,'utf8').trim().split(/\s+/).map(Number);
const x=parts[0]|0, y=parts[1]|0;
let z=x^y, cnt=0;
while(z!==0){ z &= (z-1); cnt++; } // 每次去掉最低位的 1
console.log(String(cnt));
