/**
 * 题名：LC240 搜索二维矩阵 II（右上角下降/左移）
 * 【输入】两行：第1行矩阵（JSON）；第2行 target
 * 【输出】true/false
 * 【性质】每行递增、每列递增；从右上角开始：小了就下移，大了就左移。
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
let mat=JSON.parse(lines[0]); const target=JSON.parse(lines[1]);
if(mat.length===0){ console.log('false'); process.exit(0); }
const m=mat.length, n=mat[0].length;
let i=0, j=n-1;
let ok=false;
while(i<m && j>=0){
  if(mat[i][j]===target){ ok=true; break; }
  else if(mat[i][j] > target) j--;
  else i++;
}
console.log(ok?'true':'false');
