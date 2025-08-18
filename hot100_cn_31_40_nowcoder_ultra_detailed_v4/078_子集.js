/**
 * 题名：LC078 子集（回溯）
 * 【输入】一行数组（JSON）
 * 【输出】所有子集（JSON）
 */
const fs=require('fs');
const nums=JSON.parse(fs.readFileSync(0,'utf8').trim());
const res=[], path=[];
function dfs(i){
  if(i===nums.length){ res.push(path.slice()); return; }
  dfs(i+1);
  path.push(nums[i]); dfs(i+1); path.pop();
}
dfs(0);
console.log(JSON.stringify(res));
