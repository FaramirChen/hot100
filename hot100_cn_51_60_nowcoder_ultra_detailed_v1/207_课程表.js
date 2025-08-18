/**
 * 题名：LC207 课程表（拓扑排序：Kahn BFS）
 * 【输入】两行：
 *   第1行：课程总数 n（整数，课程编号为 0..n-1）
 *   第2行：先修关系 edges（JSON），如 [[1,0],[2,1]] 表示要学 1 先学 0，要学 2 先学 1
 * 【输出】能否完成所有课程（true/false）
 * 【思路】入度数组 + 队列；不断弹出入度为 0 的点，统计出队数量是否等于 n。
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const n=parseInt(lines[0],10);
const edges=JSON.parse(lines[1]||'[]');
const g=Array.from({length:n},()=>[]);
const indeg=Array(n).fill(0);
for(const [a,b] of edges){ // b -> a
  g[b].push(a);
  indeg[a]++;
}
const q=[]; for(let i=0;i<n;i++) if(indeg[i]===0) q.push(i);
let visited=0;
while(q.length){
  const u=q.shift(); visited++;
  for(const v of g[u]){
    if(--indeg[v]===0) q.push(v);
  }
}
console.log(visited===n?'true':'false');
