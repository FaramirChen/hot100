/**
 * 题名：LC239 滑动窗口最大值（单调队列/双端队列）
 * 【输入】两行：第1行数组（JSON）；第2行 k（窗口大小）
 * 【输出】每个窗口的最大值数组（JSON）
 * 【维护】队列里存“下标”，且对应值严格单调递减；队首始终为当前窗口最大。
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const a=JSON.parse(lines[0]); const k=parseInt(lines[1],10);
const n=a.length; if(n===0||k===0){ console.log('[]'); process.exit(0); }
const q=[]; const out=[];
for(let i=0;i<n;i++){
  // 1) 弹出队尾所有比当前值小的下标
  while(q.length && a[q[q.length-1]]<=a[i]) q.pop();
  q.push(i);
  // 2) 弹出窗口外的下标
  if(q[0] <= i-k) q.shift();
  // 3) 形成窗口后记录答案
  if(i>=k-1) out.push(a[q[0]]);
}
console.log(JSON.stringify(out));
