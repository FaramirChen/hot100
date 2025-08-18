/**
 * 题名：LC763 划分字母区间（贪心）
 * 【输入】一行字符串 s（仅小写字母）
 * 【输出】每个区间的长度数组（JSON）
 * 【思路】先记录每个字符的最后出现位置；从左到右扩展当前段的右边界为区间内字符的最远位置，
 *        当 i 达到当前右边界时切分。
 */
const fs=require('fs');
const s=fs.readFileSync(0,'utf8').trim();
const last=new Array(26).fill(-1);
const A='a'.charCodeAt(0);
for(let i=0;i<s.length;i++) last[s.charCodeAt(i)-A]=i;
const res=[];
let start=0, end=0;
for(let i=0;i<s.length;i++){
  const idx=s.charCodeAt(i)-A;
  if(last[idx]>end) end=last[idx];
  if(i===end){ res.push(end-start+1); start=i+1; }
}
console.log(JSON.stringify(res));
