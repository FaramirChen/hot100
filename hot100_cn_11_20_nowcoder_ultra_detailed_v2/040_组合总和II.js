/**
 * 题名：LC040 组合总和 II（回溯 + 去重，每个元素最多一次）
 * 【输入】第1行数组（JSON，可能包含重复）；第2行 target
 * 【输出】所有和为 target 的“无重复”组合（JSON）
 * 【关键】排序后，在同一层循环中跳过相同值（i>start 且 a[i]==a[i-1]）；递归用 i+1 因每个数最多一次。
 */
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
const a = JSON.parse(lines[0]).sort((x,y)=>x-y);
const target = parseInt(lines[1], 10);

const res = [], path = [];
function dfs(start, remain){
  if (remain === 0){ res.push(path.slice()); return; }
  for (let i = start; i < a.length; i++){
    if (i > start && a[i] === a[i-1]) continue; // 横向去重
    if (a[i] > remain) break;                    // 剪枝
    path.push(a[i]);
    dfs(i + 1, remain - a[i]);                   // 每个数最多一次
    path.pop();
  }
}
dfs(0, target);
console.log(JSON.stringify(res));
