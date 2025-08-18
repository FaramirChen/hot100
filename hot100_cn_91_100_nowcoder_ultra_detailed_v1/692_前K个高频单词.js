/**
 * 题名：LC692 前 K 个高频单词
 * 【输入】两行：
 *   第1行：单词数组（JSON），如 ["i","love","leetcode","i","love","coding"]
 *   第2行：k（整数）
 * 【输出】前 k 个高频单词（JSON），按频率降序，频率相同按字典序升序
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const words=JSON.parse(lines[0]||'[]'); const k=parseInt(lines[1]||'0',10);
const cnt=new Map(); for(const w of words) cnt.set(w,(cnt.get(w)||0)+1);
const arr=[...cnt.keys()];
arr.sort((a,b)=>{
  const da=cnt.get(a), db=cnt.get(b);
  if(db!==da) return db-da; // 频率降序
  return a<b? -1 : a>b? 1 : 0; // 字典序升序
});
console.log(JSON.stringify(arr.slice(0,k)));
