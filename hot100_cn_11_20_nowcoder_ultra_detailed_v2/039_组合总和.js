/**
 * 题名：LC039 组合总和（回溯，元素可重复使用）
 * 【输入】第1行候选数组（JSON）；第2行 target
 * 【输出】所有和为 target 的组合（JSON），每个组合内非降序
 * 【策略】排序+剪枝：对下标 i，选择 cand[i]（允许重复，递归仍用 i），或跳过（递归到 i+1）。
 */
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
const cand = JSON.parse(lines[0]).sort((a,b)=>a-b);
const target = parseInt(lines[1], 10);

const res = [], path = [];
function dfs(i, sum){
  if (sum === target){ res.push(path.slice()); return; }
  if (i === cand.length) return;
  if (sum + cand[i] <= target){  // 选 cand[i]
    path.push(cand[i]);
    dfs(i, sum + cand[i]);
    path.pop();
  }
  dfs(i + 1, sum);               // 不选 cand[i]
}
dfs(0, 0);
console.log(JSON.stringify(res));
