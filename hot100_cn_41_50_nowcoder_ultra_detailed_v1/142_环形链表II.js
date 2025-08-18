/**
 * 题名：LC142 环形链表 II（返回入环节点）
 * 【输入】两行：
 *   第1行：链表节点值数组（JSON），例如：[3,2,0,-4]
 *   第2行：pos（整数），表示尾连接到的位置下标；若为 -1 表示无环
 * 【输出】入环节点的“下标”（从头结点 0 开始计数）；若无环输出 -1
 * 【原理】相遇后，让一指针从头、另一指针从相遇点同时每次一步，重合处即入环点。
 */
const fs=require('fs');

// ===== 单链表辅助（数组 <-> 链表；可按 pos 连接成环） =====
function buildList(arr) {
  const dummy = { val: 0, next: null };
  let cur = dummy;
  for (const x of arr) { cur.next = { val: x, next: null }; cur = cur.next; }
  return dummy.next;
}
function listToArray(head, limit=10000) {
  // 为了安全，限制节点数防止环造成死循环
  const out = [];
  let cur = head, steps = 0;
  while (cur && steps < limit) { out.push(cur.val); cur = cur.next; steps++; }
  return out;
}
function attachCycle(head, pos) {
  if (pos < 0 || !head) return head;
  let tail = head, idx = 0, entry = null;
  while (tail.next) { if (idx === pos) entry = tail; tail = tail.next; idx++; }
  // 处理 pos 恰好指向最后一个节点的情况
  if (idx === pos) entry = tail;
  if (entry) tail.next = entry;
  return head;
}

const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
let head=buildList(JSON.parse(lines[0]||'[]')); const pos=parseInt(lines[1]||'-1',10);
head=attachCycle(head, pos);
let slow=head, fast=head, meet=null;
while(fast && fast.next){
  slow=slow.next; fast=fast.next.next;
  if(slow===fast){ meet=slow; break; }
}
if(!meet){ console.log(String(-1)); process.exit(0); }
// 寻找入环节点
let p=head, q=meet; let idx=0;
while(p!==q){ p=p.next; q=q.next; idx++; }
console.log(String(idx));
