/**
 * 题名：LC337 打家劫舍 III（树形 DP）
 * 【输入】一行：二叉树层序数组（JSON），如：[3,2,3,null,3,null,1]
 * 【输出】最大可盗金额（整数）
 * 【状态】对每个节点返回 [不偷, 偷] 两种收益；答案取 max。
 */
const fs = require('fs');
const arr = JSON.parse(fs.readFileSync(0, 'utf8').trim());
function buildTreeLevelOrder(a) {
  if (!a || a.length === 0 || a[0] === null) return null;
  const root = { val: a[0], left: null, right: null };
  const q = [root]; let i = 1;
  while (i < a.length && q.length) {
    const node = q.shift(); if (!node) continue;
    if (i < a.length) { const lv = a[i++]; if (lv !== null && lv !== undefined) { node.left = { val: lv, left: null, right: null }; q.push(node.left); } else q.push(null); }
    if (i < a.length) { const rv = a[i++]; if (rv !== null && rv !== undefined) { node.right = { val: rv, left: null, right: null }; q.push(node.right); } else q.push(null); }
  }
  return root;
}
function dfs(u) {
  if (!u) return [0, 0];
  const L = dfs(u.left), R = dfs(u.right);
  const notRob = Math.max(L[0], L[1]) + Math.max(R[0], R[1]);
  const rob = u.val + L[0] + R[0];
  return [notRob, rob];
}
const root = buildTreeLevelOrder(arr);
const ans = dfs(root);
console.log(String(Math.max(ans[0], ans[1])));
