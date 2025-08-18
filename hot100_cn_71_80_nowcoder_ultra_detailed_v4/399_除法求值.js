/**
 * 题名：LC399 除法求值（图 + BFS/DFS）
 * 【输入】三行：
 *   第1行：方程 edges（JSON），如 [["a","b"],["b","c"]]
 *   第2行：对应值 values（JSON），如 [2.0, 3.0]
 *   第3行：查询 queries（JSON），如 [["a","c"],["b","a"],["a","e"]]
 * 【输出】每个查询的结果（JSON），无解为 -1.0
 */
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
const edges = JSON.parse(lines[0] || '[]');
const values = JSON.parse(lines[1] || '[]');
const queries = JSON.parse(lines[2] || '[]');
const g = new Map();
function add(u, v, w) {
  if (!g.has(u)) g.set(u, []);
  if (!g.has(v)) g.set(v, []);
  g.get(u).push([v, w]);
  g.get(v).push([u, 1 / w]);
}
for (let i = 0; i < edges.length; i++) add(edges[i][0], edges[i][1], values[i]);
function calc(s, t) {
  if (!g.has(s) || !g.has(t)) return -1.0;
  if (s === t) return 1.0;
  const q = [[s, 1.0]]; const vis = new Set([s]);
  for (let qi = 0; qi < q.length; qi++) {
    const [u, val] = q[qi];
    for (const [v, w] of g.get(u)) {
      if (vis.has(v)) continue;
      const nv = val * w;
      if (v === t) return nv;
      vis.add(v); q.push([v, nv]);
    }
  }
  return -1.0;
}
console.log(JSON.stringify(queries.map(([u, v]) => calc(u, v))));
