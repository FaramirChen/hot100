/**
 * 题名：LC448 找到所有数组中消失的数字（原地标记）
 * 【输入】一行数组（JSON），长度 n，元素范围 1..n
 * 【输出】缺失的所有数字数组（JSON）
 * 【方法】把出现过的数 x，在下标 x-1 处取负标记；最后正数位置对应的下标+1 即为缺失。
 */
const fs=require('fs');
const a=JSON.parse(fs.readFileSync(0,'utf8').trim());
for(let i=0;i<a.length;i++){
  const idx=Math.abs(a[i])-1;
  if(a[idx]>0) a[idx] = -a[idx];
}
const out=[];
for(let i=0;i<a.length;i++) if(a[i]>0) out.push(i+1);
console.log(JSON.stringify(out));
