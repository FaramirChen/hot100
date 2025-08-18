/**
 * 题名：LC056 合并区间（排序 + 扫描）
 * 【输入】一行区间数组（JSON），例如 [[1,3],[2,6],[8,10],[15,18]]
 * 【输出】合并后的区间（JSON），例如 [[1,6],[8,10],[15,18]]
 * 【方法】按左端点排序，维护当前合并区间 cur=[L,R]；
 *        若下一个区间 [l,r] 的 l <= R（有交集），则 R=max(R,r)；否则推入 cur 并重置。
 */
const fs = require('fs');
const intervals = JSON.parse(fs.readFileSync(0, 'utf8').trim());
intervals.sort((x,y)=>x[0]-y[0]);
const res=[];
for(const it of intervals){
  if(res.length===0 || it[0] > res[res.length-1][1]){
    // 无重叠：开启新区间
    res.push(it.slice());
  }else{
    // 有重叠：扩展右端点
    res[res.length-1][1] = Math.max(res[res.length-1][1], it[1]);
  }
}
console.log(JSON.stringify(res));
