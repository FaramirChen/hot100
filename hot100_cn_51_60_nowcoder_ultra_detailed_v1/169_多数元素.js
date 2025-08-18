/**
 * 题名：LC169 多数元素（Boyer-Moore 投票）
 * 【输入】一行数组（JSON）
 * 【输出】多数元素（题设保证存在）
 */
const fs=require('fs');
const a=JSON.parse(fs.readFileSync(0,'utf8').trim());
let cand=null, cnt=0;
for(const x of a){
  if(cnt===0){ cand=x; cnt=1; }
  else if(x===cand) cnt++;
  else cnt--;
}
console.log(String(cand));
