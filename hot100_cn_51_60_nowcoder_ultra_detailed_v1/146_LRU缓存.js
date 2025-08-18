/**
 * 题名：LC146 LRU 缓存（双向链表 + 哈希表）
 * 【输入】两行：
 *   第1行：操作数组（JSON），例如 ["LRUCache","put","put","get","put","get","get"]
 *   第2行：参数数组（JSON），例如 [[2],[1,1],[2,2],[1],[3,3],[2],[3]]
 * 【输出】每个操作的返回值（JSON 数组）。对于构造器与 put，输出 null。
 * 【设计关键】
 *   - 哈希：key -> 双向链表节点（存 key 与 val）；
 *   - 双链表：最近使用的节点移动到表头，淘汰发生在表尾。
 *   - 操作：get/put 均要把节点“提到表头”。
 * 【复杂度】每次操作 O(1)。
 */
const fs = require('fs');
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
const ops = JSON.parse(lines[0]); const args = JSON.parse(lines[1]);

class Node {
  constructor(k, v){ this.k=k; this.v=v; this.prev=null; this.next=null; }
}
class LRUCache {
  constructor(cap){
    this.cap = cap;
    this.map = new Map();
    // 伪头尾：便于统一插入/删除逻辑
    this.head = new Node(0,0);
    this.tail = new Node(0,0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  _remove(node){
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  _insertToHead(node){
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }
  get(key){
    if(!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._insertToHead(node); // 提到表头：最近使用
    return node.v;
  }
  put(key, val){
    if(this.map.has(key)){
      const node = this.map.get(key);
      node.v = val;
      this._remove(node);
      this._insertToHead(node);
    }else{
      if(this.map.size === this.cap){
        // 淘汰表尾的“实际最后节点”（tail.prev）
        const del = this.tail.prev;
        this._remove(del);
        this.map.delete(del.k);
      }
      const node = new Node(key, val);
      this._insertToHead(node);
      this.map.set(key, node);
    }
    return null;
  }
}
let cache=null; const out=[];
for(let i=0;i<ops.length;i++){
  const op=ops[i], a=args[i];
  if(op==="LRUCache"){ cache=new LRUCache(a[0]); out.push(null); }
  else if(op==="put"){ out.push(cache.put(a[0], a[1])); }
  else if(op==="get"){ out.push(cache.get(a[0])); }
  else { out.push(null); }
}
console.log(JSON.stringify(out));
