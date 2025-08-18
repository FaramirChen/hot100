/**
 * 题名：LC046 全排列（回溯，原地交换）
 * 【输入】一行数组（JSON），元素互不相同
 * 【输出】所有排列（JSON 数组）
 * 【思路】固定前缀位置 first，依次把后面的元素交换到 first，然后递归 first+1；回溯时再交换回来。
 */
const fs = require('fs');
const nums = JSON.parse(fs.readFileSync(0, 'utf8').trim());

const res = [];
function backtrack(first){
  if (first === nums.length){ res.push(nums.slice()); return; }
  for (let i = first; i < nums.length; i++){
    [nums[first], nums[i]] = [nums[i], nums[first]];  // 选择：把 nums[i] 放到 first
    backtrack(first + 1);
    [nums[first], nums[i]] = [nums[i], nums[first]];  // 撤销：恢复现场
  }
}
backtrack(0);
console.log(JSON.stringify(res));
