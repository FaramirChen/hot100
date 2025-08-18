/**
 * 题名：LC079 单词搜索（DFS 回溯）
 * 【输入】第1行棋盘（JSON 二维字符数组或字符串数组），第2行 word
 * 【输出】true/false
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
let board=JSON.parse(lines[0]); const word=(lines[1]||'').trim();
if(board.length>0 && typeof board[0]==='string'){ board=board.map(r=>r.split('')); }
const m=board.length, n=board[0]?.length||0;
const vis=Array.from({length:m},()=>Array(n).fill(false));
const dirs=[[1,0],[-1,0],[0,1],[0,-1]];
function dfs(x,y,k){
  if(board[x][y]!==word[k]) return false;
  if(k===word.length-1) return true;
  vis[x][y]=true;
  for(const [dx,dy] of dirs){
    const nx=x+dx, ny=y+dy;
    if(nx>=0&&nx<m&&ny>=0&&ny<n && !vis[nx][ny]){
      if(dfs(nx,ny,k+1)){ vis[x][y]=false; return true; }
    }
  }
  vis[x][y]=false; return false;
}
let ok=false;
for(let i=0;i<m;i++){ for(let j=0;j<n;j++){ if(dfs(i,j,0)){ ok=true; break; } } if(ok) break; }
console.log(ok?'true':'false');
