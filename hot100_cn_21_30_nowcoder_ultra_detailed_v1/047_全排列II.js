/**
 * 题名：LC047 全排列 II（回溯 + 去重）
 * 【输入】一行数组（JSON），例如：[1,1,2]
 * 【输出】所有不含重复的全排列（JSON 数组）
 * 【关键】排序 + “同层去重”：当 nums[i] == nums[i-1] 且前一个同值在当前路径中未使用时，跳过 nums[i]。
 * 【复杂度】O(n * n!)；空间 O(n)（递归栈 + used 数组）。
 */
const fs = require('fs');
const nums = JSON.parse(fs.readFileSync(0, 'utf8').trim());

nums.sort((a,b)=>a-b);                   // 排序便于去重
const used = Array(nums.length).fill(false);
const res = [];
const path = [];

function dfs(){
  // 终止：路径长度等于数组长度时收集一个排列
  if(path.length === nums.length){
    res.push(path.slice());
    return;
  }
  for(let i=0;i<nums.length;i++){
    if(used[i]) continue;               // 已用过，跳过
    // 同层去重：如果当前值与前一个值相等，且前一个值在当前层没有被使用，则跳过
    if(i>0 && nums[i]===nums[i-1] && !used[i-1]) continue;
    // 做选择
    used[i] = true;
    path.push(nums[i]);
    dfs();
    // 撤销选择
    path.pop();
    used[i] = false;
  }
}
dfs();
console.log(JSON.stringify(res));
