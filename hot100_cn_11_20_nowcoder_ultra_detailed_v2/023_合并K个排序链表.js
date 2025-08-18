/**
 * 题名：LC023 合并 K 个排序链表（小根堆 / 优先队列）
 * 【输入】一行 JSON，形如 [[1,4,5],[1,3,4],[2,6]] 表示 K 条升序链表
 * 【输出】合并后的升序链表（用数组表示）
 * 【思路】K 路归并：把 K 条链表的当前表头放进小根堆，反复弹出最小者接到答案尾部；
 *        若弹出的节点有 next，再把 next 放回堆中；直到堆为空。
 * 【复杂度】总节点 N，链数 K：O(N log K)；堆空间 O(K)。
 */
const fs = require('fs');
const listsArr = JSON.parse(fs.readFileSync(0, 'utf8').trim());

// 数组 <-> 单链表
function buildList(arr){ const d={val:0,next:null}; let c=d; for(const x of arr){ c.next={val:x,next:null}; c=c.next;} return d.next; }
function listToArray(h){ const out=[]; while(h){ out.push(h.val); h=h.next; } return out; }
const lists = listsArr.map(buildList);

// 小根堆（按节点 val 比较）
class MinHeap{
  constructor(){ this.a=[]; }
  size(){ return this.a.length; }
  push(x){ this.a.push(x); this._up(this.a.length-1); }
  pop(){
    if(!this.a.length) return null;
    const top=this.a[0], last=this.a.pop();
    if(this.a.length){ this.a[0]=last; this._down(0); }
    return top;
  }
  _up(i){ while(i>0){ const p=(i-1)>>1; if(this.a[p].val<=this.a[i].val) break; [this.a[p],this.a[i]]=[this.a[i],this.a[p]]; i=p; } }
  _down(i){
    const n=this.a.length;
    while(true){
      let l=i*2+1, r=l+1, m=i;
      if(l<n && this.a[l].val<this.a[m].val) m=l;
      if(r<n && this.a[r].val<this.a[m].val) m=r;
      if(m===i) break;
      [this.a[m],this.a[i]]=[this.a[i],this.a[m]]; i=m;
    }
  }
}

function mergeKLists(lists){
  const h=new MinHeap();
  for(const node of lists) if(node) h.push(node);
  const d={val:0,next:null}; let t=d;
  while(h.size()){
    const node=h.pop();
    t.next=node; t=t.next;
    if(node.next) h.push(node.next);
  }
  return d.next;
}

console.log(JSON.stringify(listToArray(mergeKLists(lists))));
