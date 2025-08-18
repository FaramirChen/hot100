/**
 * 题名：LC695 岛屿的最大面积（DFS/BFS）
 * 【输入】一行网格（JSON），可为 ['110','010'] 或 [[1,1,0],[0,1,0]] 或 [['1','1','0'],...]
 * 【输出】最大岛屿面积（整数）
 */
const fs=require('fs');
let grid=JSON.parse(fs.readFileSync(0,'utf8').trim());
if(grid.length===0){ console.log('0'); process.exit(0); }
if(typeof grid[0] === 'string'){ grid = grid.map(row=>row.split('').map(ch=>ch==='1'?1:0)); }
else if(typeof grid[0][0] === 'string'){ grid = grid.map(row=>row.map(ch=>ch==='1'?1:0)); }
const m=grid.length, n=grid[0].length;
const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
function dfs(x,y){
  if(x<0||x>=m||y<0||y>=n||grid[x][y]!==1) return 0;
  grid[x][y]=2; // 标记已访问
  let area=1;
  for(const [dx,dy] of dirs) area += dfs(x+dx,y+dy);
  return area;
}
let best=0;
for(let i=0;i<m;i++) for(let j=0;j<n;j++) if(grid[i][j]===1){ const a=dfs(i,j); if(a>best) best=a; }
console.log(String(best));
