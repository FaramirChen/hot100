/**
 * 题名：LC160 相交链表（双指针切换）
 * 【输入】三行：
 *   第1行：链表 A 的数组（JSON）
 *   第2行：链表 B 的数组（JSON）
 *   第3行：connectPos（整数，-1 表示不相交；否则表示 B 的尾部连到 A 的 connectPos 下标处）
 * 【输出】相交节点的“值”；若无相交输出 -1
 * 【原理】双指针 pA/pB 各自走到对方链表头，最终相等处即交点（或都为 null）。
 */
const fs=require('fs');

// ===== 单链表辅助（数组 <-> 链表） =====
function buildList(arr) {
  const dummy = { val: 0, next: null };
  let cur = dummy;
  for (const x of arr) { cur.next = { val: x, next: null }; cur = cur.next; }
  return dummy.next;
}
function listToArray(head, limit=100000) {
  const out = [];
  let cur = head, steps = 0;
  while (cur && steps < limit) { out.push(cur.val); cur = cur.next; steps++; }
  return out;
}
function listLength(head){
  let n=0; while(head){ n++; head=head.next; } return n;
}

const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
let A=buildList(JSON.parse(lines[0]||'[]'));
let B=buildList(JSON.parse(lines[1]||'[]'));
const pos=parseInt(lines[2]||'-1',10);
// 构造相交：把 B 的尾结点指向 A[pos]
if(pos>=0){
  let tailB=B, lastB=null; while(tailB){ lastB=tailB; tailB=tailB.next; }
  let p=A, idx=0, entry=null; while(p){ if(idx===pos){ entry=p; break; } p=p.next; idx++; }
  if(lastB && entry) lastB.next = entry;
}
function getIntersectionNode(a,b){
  let p=a, q=b;
  while(p!==q){
    p = p? p.next : b;
    q = q? q.next : a;
  }
  return p;
}
const inter = getIntersectionNode(A,B);
console.log(inter? String(inter.val) : String(-1));
