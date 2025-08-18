/**
 * 题名：LC136 只出现一次的数字（位运算 XOR）
 * 【输入】一行数组（JSON），除一个元素只出现一次外，其余均出现两次
 * 【输出】只出现一次的那个数
 * 【性质】x^x=0，x^0=x；把所有数异或即可。
 */
const fs=require('fs');
const nums=JSON.parse(fs.readFileSync(0,'utf8').trim());
let ans=0; for(const x of nums) ans^=x;
console.log(String(ans));
