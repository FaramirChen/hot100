/**
 * 题名：LC022 括号生成（回溯 / DFS + 有效性约束）
 * 【输入】一行整数 n（对数）
 * 【输出】所有合法括号序列（JSON 数组）
 * 【核心不变式】在任何前缀下，都必须满足：已用右括号数量 <= 已用左括号数量；且左右括号都不超过 n。
 * 【复杂度】卡特兰数规模；回溯为最直观正确的做法。
 */
const fs = require('fs');
const n = parseInt(fs.readFileSync(0, 'utf8').trim(), 10);

const res = [];
/**
 * dfs(path, lUsed, rUsed)
 * - path：当前构造的串
 * - lUsed：已经使用的 '(' 个数
 * - rUsed：已经使用的 ')' 个数
 */
function dfs(path, lUsed, rUsed) {
  // 终止：长度达到 2*n，即放满了 n 对括号
  if (path.length === 2 * n) {
    res.push(path);
    return;
  }
  // 选择1：可以继续放 '(' ，前提是左括号未超过 n
  if (lUsed < n) dfs(path + '(', lUsed + 1, rUsed);
  // 选择2：可以放 ')' ，前提是右括号数量不能超过左括号
  if (rUsed < lUsed) dfs(path + ')', lUsed, rUsed + 1);
}
dfs('', 0, 0);

console.log(JSON.stringify(res));
