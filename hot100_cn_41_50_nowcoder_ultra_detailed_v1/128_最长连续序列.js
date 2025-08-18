/**
 * 题名：LC128 最长连续序列（哈希集合）
 * 【输入】一行数组（JSON），元素可无序
 * 【输出】最长连续序列的长度（例如 [100,4,200,1,3,2] -> 4，对应 1,2,3,4）
 * 【策略】把所有数放进 Set；只从“序列起点”（x-1 不在集合中）向右扩展计数。
 * 【复杂度】均摊 O(n)。
 */
const fs=require('fs');
const nums=JSON.parse(fs.readFileSync(0,'utf8').trim());
const st=new Set(nums);
let best=0;
for(const x of st){
  if(!st.has(x-1)){ // 只从起点开始
    let y=x, len=1;
    while(st.has(y+1)){ y++; len++; }
    if(len>best) best=len;
  }
}
console.log(String(best));
