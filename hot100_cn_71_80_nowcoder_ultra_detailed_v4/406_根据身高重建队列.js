/**
 * 题名：LC406 根据身高重建队列
 * 【输入】一行二维数组（JSON），每项为 [h, k]
 * 【输出】重建后的队列（JSON）
 * 【做法】按身高降序、k 升序排序，然后按 k 作为插入位置插入结果数组。
 */
const fs = require('fs');
const people = JSON.parse(fs.readFileSync(0, 'utf8').trim());
people.sort((a,b)=> (b[0]-a[0]) || (a[1]-b[1]));
const res = [];
for (const p of people) res.splice(p[1], 0, p);
console.log(JSON.stringify(res));
