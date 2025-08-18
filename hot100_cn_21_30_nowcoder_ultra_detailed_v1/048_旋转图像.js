/**
 * 题名：LC048 旋转图像（原地旋转 90°，转置 + 水平翻转）
 * 【输入】一行 n×n 矩阵（JSON），例如：[[1,2,3],[4,5,6],[7,8,9]]
 * 【输出】旋转后的矩阵（JSON）
 * 【方法】
 *   1) 主对角线“转置”：matrix[i][j] <-> matrix[j][i]（i<j）；
 *   2) 每一行再“左右翻转”：matrix[i][l] <-> matrix[i][r]。
 * 【复杂度】O(n^2)；原地操作 O(1) 空间。
 */
const fs = require('fs');
const m = JSON.parse(fs.readFileSync(0, 'utf8').trim());
const n = m.length;

// 1) 转置
for(let i=0;i<n;i++){
  for(let j=i+1;j<n;j++){
    const t = m[i][j]; m[i][j] = m[j][i]; m[j][i] = t;
  }
}
// 2) 每行左右翻转
for(let i=0;i<n;i++){
  let l=0, r=n-1;
  while(l<r){ const t=m[i][l]; m[i][l]=m[i][r]; m[i][r]=t; l++; r--; }
}

console.log(JSON.stringify(m));
