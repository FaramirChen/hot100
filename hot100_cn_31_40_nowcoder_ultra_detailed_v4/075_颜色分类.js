/**
 * 题名：LC075 颜色分类（荷兰国旗问题，原地三指针）
 * 【输入】一行数组（JSON），只含 0、1、2
 * 【输出】排序后的数组（JSON）
 * 【要点】维护三段：[0..p0-1]=0， [p0..i-1]=1， [i..p2]=未知， [p2+1..]=2。
 */
const fs=require('fs');
const nums=JSON.parse(fs.readFileSync(0,'utf8').trim());
let p0=0, i=0, p2=nums.length-1;
while(i<=p2){
  if(nums[i]===0){ [nums[i],nums[p0]]=[nums[p0],nums[i]]; p0++; i++; }
  else if(nums[i]===1){ i++; }
  else { [nums[i],nums[p2]]=[nums[p2],nums[i]]; p2--; } // 与右端交换后不前进
}
console.log(JSON.stringify(nums));
