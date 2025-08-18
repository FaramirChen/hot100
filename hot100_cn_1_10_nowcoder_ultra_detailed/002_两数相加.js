/**
 * 题名：LC002 两数相加（链表，高精度加法）
 * 机考说明：
 *   - 输入：第1行为链表A的“节点值数组（JSON）”，表示低位在前的整数；第2行为链表B的数组
 *     例如：A=[2,4,3] 表示 342；B=[5,6,4] 表示 465
 *   - 输出：相加后的链表数组（同样低位在前），例如 [7,0,8] 表示 807
 * 思路：
 *   - 两个链表从头（低位）同步相加，携带进位 carry；直到两个链表都处理完且无进位。
 *   - 因输入用“数组模拟链表”，我们需要：数组 -> 链表 的构造、链表 -> 数组 的输出。
 * 复杂度：时间 O(m+n)，空间 O(1)（除结果链表外）。
 */
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);

// ===== 链表辅助：数组 <-> 单链表 =====
// 把数组构造成单链表（返回头结点）。使用哑结点 dummy 简化操作。
function buildList(arr) {
  const dummy = { val: 0, next: null };
  let cur = dummy;
  for (const x of arr) {
    cur.next = { val: x, next: null };
    cur = cur.next;
  }
  return dummy.next;
}
// 把单链表转回数组，便于输出到牛客平台
function listToArray(head) {
  const out = [];
  while (head) {
    out.push(head.val);
    head = head.next;
  }
  return out;
}

const listA = buildList(JSON.parse(lines[0]));
const listB = buildList(JSON.parse(lines[1]));

// 遍历同时进行加法：p/q 分别在两条链上移动；carry 保存进位
let p = listA, q = listB, carry = 0;
const dummy = { val: 0, next: null };
let tail = dummy;

while (p || q || carry) {
  // 若某条链已走完，按 0 处理该位
  const a = p ? p.val : 0;
  const b = q ? q.val : 0;
  const s = a + b + carry;

  // 新节点的值 = 当前位和 s 的个位
  tail.next = { val: s % 10, next: null };
  tail = tail.next;

  // 进位：整除 10
  carry = (s / 10) | 0;

  // 指针向前
  if (p) p = p.next;
  if (q) q = q.next;
}

// 输出数组表示（低位在前）
console.log(JSON.stringify(listToArray(dummy.next)));
