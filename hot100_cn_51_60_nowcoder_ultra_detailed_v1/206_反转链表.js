/**
 * 题名：LC206 反转链表（迭代）
 * 【输入】一行链表数组（JSON）
 * 【输出】反转后的链表数组（JSON）
 * 【原理】逐步把当前节点的 next 指向“前驱”，三指针迭代。
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

const arr=JSON.parse(fs.readFileSync(0,'utf8').trim());
let head=buildList(arr);
let prev=null, cur=head;
while(cur){
  const nxt=cur.next;
  cur.next=prev;
  prev=cur;
  cur=nxt;
}
console.log(JSON.stringify(listToArray(prev)));
