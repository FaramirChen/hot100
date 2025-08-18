/**
 * 题名：LC019 删除链表的倒数第 N 个结点（快慢双指针 + 哑结点）
 * 机考说明：
 *   - 输入：第1行链表的数组（JSON），第2行 n（整数）
 *   - 输出：删除后的链表数组（JSON）
 * 不变量与步骤：
 *   - 使用 dummy->head，以统一删除头结点的场景。
 *   - 先让 fast 走 n 步；之后 fast 与 slow 同时前进，直到 fast 到末尾（fast.next == null）。
 *   - 此时 slow.next 就是要删除的目标节点。
 * 复杂度：O(L)，L 为链长；空间 O(1)。
 */
const fs = require('fs');

// 辅助：数组 <-> 单链表
function buildList(arr) {
  const dummy = { val: 0, next: null };
  let cur = dummy;
  for (const x of arr) { cur.next = { val: x, next: null }; cur = cur.next; }
  return dummy.next;
}
function listToArray(head) {
  const out = [];
  while (head) { out.push(head.val); head = head.next; }
  return out;
}

const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
let head = buildList(JSON.parse(lines[0]));
const n = parseInt(lines[1], 10);

// 哑结点，指向头结点；方便统一删除逻辑
const dummy = { val: 0, next: head };
let fast = dummy, slow = dummy;

// 1) fast 先走 n 步，使 fast 与 slow 间距为 n
for (let i = 0; i < n; i++) fast = fast.next;

// 2) 同步前进，直到 fast 到达链表末尾（fast.next == null）
//    这时 slow 恰好在“目标前驱”位置
while (fast.next) { fast = fast.next; slow = slow.next; }

// 3) 删除 slow.next
if (slow.next) slow.next = slow.next.next;

// 输出删除后的链表（数组形式）
console.log(JSON.stringify(listToArray(dummy.next)));
