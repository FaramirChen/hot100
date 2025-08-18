/**
 * 题名：LC020 有效的括号（栈匹配）
 * 机考说明：
 *   - 输入：一行只包含 ()[]{} 的字符串
 *   - 输出：true / false
 * 核心：
 *   - 扫描字符串，遇到左括号入栈；遇到右括号时，检查是否与“栈顶左括号”匹配。
 *   - 全部处理完毕，栈必须为空才算合法。
 * 边界：
 *   - 右括号出现时栈为空 -> false
 *   - 右括号与栈顶不匹配 -> false
 */
const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim();

const st = [];  // 栈：存放尚未匹配的左括号
// 右括号 -> 左括号 的映射，便于匹配检查
const pair = { ')': '(', ']': '[', '}': '{' };

for (const ch of s) {
  // 如果是左括号，压栈等待匹配
  if (ch === '(' || ch === '[' || ch === '{') {
    st.push(ch);
  } else {
    // 如果是右括号：栈必须非空且能与栈顶配对
    if (st.length === 0 || st[st.length - 1] !== pair[ch]) {
      console.log('false');
      process.exit(0);
    }
    st.pop();
  }
}

// 只有栈被完全清空，才是完全匹配
console.log(st.length === 0 ? 'true' : 'false');
