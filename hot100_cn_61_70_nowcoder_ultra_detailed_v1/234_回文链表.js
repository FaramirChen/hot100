/**
 * 题名：LC234 回文链表（快慢指针 + 反转后半）
 * 【输入】一行：链表数组（JSON）
 * 【输出】true/false
 * 【步骤】快慢指针找到中点；反转后半；逐对比较；（可选）恢复链表。
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

const arr=JSON.parse(fs.readFileSync(0,'utf8').trim());
let head=buildList(arr);
if(!head||!head.next){ console.log('true'); process.exit(0); }
let slow=head, fast=head;
while(fast&&fast.next){ slow=slow.next; fast=fast.next.next; }
// 若为奇数长度，slow 为中点；反转 slow 起始的后半
function reverse(h){ let p=null,c=h; while(c){ const n=c.next; c.next=p; p=c; c=n; } return p; }
let second = reverse(slow);
let p1=head, p2=second; let ok=true;
while(p2){ if(p1.val!==p2.val){ ok=false; break; } p1=p1.next; p2=p2.next; }
console.log(ok?'true':'false');
