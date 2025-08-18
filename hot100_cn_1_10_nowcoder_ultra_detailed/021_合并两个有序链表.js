/**
 * 题名：LC021 合并两个有序链表（双指针）
 * 机考说明：
 *   - 输入：两行，分别是链表 A 与链表 B 的“节点值数组（JSON）”，各自升序
 *   - 输出：合并后的链表数组（仍然升序）
 * 方法：模拟归并排序的“合并”过程，逐个比较两条链表的当前节点，取较小者接到新链表末尾。
 * 复杂度：时间 O(m+n)，空间 O(1)（除结果链表）。
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
const l1 = buildList(JSON.parse(lines[0]));
const l2 = buildList(JSON.parse(lines[1]));

// 归并：指针 p、q 分别遍历两链，c 指向结果链表的当前末尾
function merge(a, b) {
  const dummy = { val: 0, next: null };
  let c = dummy, p = a, q = b;

  while (p && q) {
    if (p.val <= q.val) {        // p 较小，接到结果链末尾
      c.next = p; p = p.next;
    } else {                     // q 较小或相等（相等时接哪条都正确，这里接 q）
      c.next = q; q = q.next;
    }
    c = c.next;                  // 结果链表末尾后移
  }
  // 把未耗尽的剩余部分直接接上
  c.next = p ? p : q;

  return dummy.next;
}

console.log(JSON.stringify(listToArray(merge(l1, l2))));
