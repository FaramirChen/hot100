/**
 * 题名：LC042 接雨水（双指针）
 * 【输入】一行高度数组（JSON）
 * 【输出】总接水量（整数）
 * 【原理】当前位置能接的水 = min(左侧最高, 右侧最高) - h[i]（小于0时视为0）。
 *        用双指针从两侧向中间推进，较短侧决定当前格的水量并移动该侧。
 */
const fs = require('fs');
const h = JSON.parse(fs.readFileSync(0, 'utf8').trim());

let l=0, r=h.length-1, lm=0, rm=0, water=0;
while (l < r){
  if (h[l] < h[r]){
    if (h[l] >= lm) lm = h[l];
    else water += (lm - h[l]);
    l++;
  }else{
    if (h[r] >= rm) rm = h[r];
    else water += (rm - h[r]);
    r--;
  }
}
console.log(String(water));
