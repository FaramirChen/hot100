/**
 * 题名：LC200 岛屿数量（DFS/BFS）
 * 【输入】一行网格（JSON），可以是：["110","010"] 或 [['1','1','0'],...] 或 [[1,1,0],...]
 * 【输出】岛屿数量（整数）
 * 【定义】上下左右连通的 '1' 形成一个岛。
 */
const fs=require('fs');
let grid=JSON.parse(fs.readFileSync(0,'utf8').trim());
if(grid.length===0){ console.log('0'); process.exit(0); }
// 标准化为字符 '0'/'1'
if(typeof grid[0] === 'string'){
  grid = grid.map(row => row.split(''));
}else if(typeof grid[0][0] === 'number'){
  grid = grid.map(row => row.map(x => x ? '1' : '0'));
}
const m=grid.length, n=grid[0].length;
const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
function dfs(x,y){
  if(x<0||x>=m||y<0||y>=n||grid[x][y]!=='1') return;
  grid[x][y] = '0';
  for(const [dx,dy] of dirs) dfs(x+dx,y+dy);
}
let cnt=0;
for(let i=0;i<m;i++){
  for(let j=0;j<n;j++){
    if(grid[i][j]==='1'){ cnt++; dfs(i,j); }
  }
}
console.log(String(cnt));
