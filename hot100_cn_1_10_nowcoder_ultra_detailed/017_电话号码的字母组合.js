/**
 * 题名：LC017 电话号码的字母组合（回溯 / DFS）
 * 机考说明：
 *   - 输入：一行，仅包含数字 2-9 的字符串（如 "23"）
 *   - 输出：所有可能的字母组合（JSON 数组）
 * 思路：
 *   - 数字 -> 字母的映射固定；回溯构造路径 path，当 path 长度等于 digits 长度时收集答案。
 * 复杂度：最多 4^n（n 为输入长度）；对机考数据完全可行。
 */
const fs = require('fs');
const digits = fs.readFileSync(0, 'utf8').trim();

// 空输入直接返回空数组
if (!digits) { console.log('[]'); process.exit(0); }

// 数字到字母的映射（手机九宫格）
const mp = {
  '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
  '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
};

const res = [];     // 存放所有组合
const path = [];    // 当前正在构造的字符串（以数组方式存放字符更高效）

/**
 * dfs(i): 处理第 i 位数字（0-based）。
 *  - 若 i == digits.length，说明已经为每一位都选好了一个字母，收集答案。
 *  - 否则，遍历第 i 个数字对应的每个字母，做选择 -> 递归 -> 撤销选择。
 */
function dfs(i) {
  if (i === digits.length) {
    res.push(path.join(''));
    return;
  }
  const letters = mp[digits[i]];   // 当前数字的字母集合
  for (const ch of letters) {
    path.push(ch);   // 做选择
    dfs(i + 1);      // 递归处理下一位
    path.pop();      // 撤销选择，回溯到上一步状态
  }
}

dfs(0);
console.log(JSON.stringify(res));
