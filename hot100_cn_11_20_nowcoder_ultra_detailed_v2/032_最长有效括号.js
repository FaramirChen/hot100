/**
 * 题名：LC032 最长有效括号（栈 / 基准下标法）
 * 【输入】一行只含 '(' 与 ')' 的字符串
 * 【输出】最长有效括号子串的长度
 * 【技巧】栈里存“未匹配的位置”，栈底先放 -1 作为“最近一个不合法位置”的哨兵。
 */
const fs = require('fs');
const s = fs.readFileSync(0, 'utf8').trim();

const st = [-1]; // 栈底哨兵：最近一次不合法位置
let best = 0;

for (let i = 0; i < s.length; i++) {
  if (s[i] === '(') {
    st.push(i); // 左括号：下标入栈
  } else {
    st.pop();   // 右括号：弹出一个未匹配的左括号
    if (st.length === 0) {
      // 没有可匹配的左括号，把当前位置作为新的“最近不合法位置”
      st.push(i);
    } else {
      // 栈顶保存了“最后一个未匹配位置”的下标
      best = Math.max(best, i - st[st.length - 1]);
    }
  }
}

console.log(String(best));
