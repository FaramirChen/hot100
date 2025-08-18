/**
 * 题名：LC148 排序链表（自顶向下/自底向上归并）
 * 【输入】一行：链表节点值数组（JSON）
 * 【输出】排序后的链表数组（JSON）
 * 【说明】这里实现“自底向上”迭代归并，O(1) 额外空间、O(n log n) 时间。
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

function split(head, n){
  // 从 head 开始向后走 n 步，切断并返回后半段的头
  while(n>1 && head){ head=head.next; n--; }
  if(!head) return null;
  const second = head.next;
  head.next = null;
  return second;
}
function merge(a, b){
  const d={val:0,next:null}; let t=d;
  while(a && b){
    if(a.val<=b.val){ t.next=a; a=a.next; }
    else{ t.next=b; b=b.next; }
    t=t.next;
  }
  t.next = a? a : b;
  while(t.next) t=t.next; // 返回尾指针方便拼接
  return [d.next, t];
}

function sortList(head){
  if(!head || !head.next) return head;
  // 计算长度
  let n=0; let p=head; while(p){ n++; p=p.next; }
  const dummy={val:0,next:head};
  // 每次归并子链长度 size=1,2,4,8...
  for(let size=1; size<n; size<<=1){
    let cur=dummy.next, tail=dummy;
    while(cur){
      const left = cur;
      const right = split(left, size);
      cur = split(right, size);
      const [mergedHead, mergedTail] = merge(left, right);
      tail.next = mergedHead;
      tail = mergedTail;
    }
  }
  return dummy.next;
}

console.log(JSON.stringify(listToArray(sortList(head))));
