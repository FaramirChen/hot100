/**
 * 题名：LC208 实现 Trie (前缀树)
 * 【输入】两行：
 *   第1行：操作数组（JSON），如 ["Trie","insert","search","searchPrefix","startsWith"]
 *   第2行：参数数组（JSON），如 [[],["apple"],["apple"],["app"],["app"]]
 * 【输出】每个操作的返回值数组（构造与 insert 返回 null）
 * 【说明】LeetCode 用 "search" 与 "startsWith"，这里额外兼容 "searchPrefix" 等
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const ops=JSON.parse(lines[0]); const args=JSON.parse(lines[1]);
class TrieNode{ constructor(){ this.next=new Map(); this.end=false; } }
class Trie{
  constructor(){ this.root=new TrieNode(); }
  insert(word){ let p=this.root; for(const ch of word){ if(!p.next.has(ch)) p.next.set(ch,new TrieNode()); p=p.next.get(ch); } p.end=true; return null; }
  _findNode(prefix){ let p=this.root; for(const ch of prefix){ if(!p.next.has(ch)) return null; p=p.next.get(ch); } return p; }
  search(word){ const node=this._findNode(word); return !!(node && node.end); }
  startsWith(prefix){ return !!this._findNode(prefix); }
}
let trie=null; const out=[];
for(let i=0;i<ops.length;i++){
  const op=ops[i], a=args[i];
  if(op==="Trie"){ trie=new Trie(); out.push(null); }
  else if(op==="insert"){ out.push(trie.insert(a[0]||"")); }
  else if(op==="search"){ out.push(trie.search(a[0]||"")); }
  else if(op==="startsWith" || op==="searchPrefix"){ out.push(trie.startsWith(a[0]||"")); }
  else out.push(null);
}
console.log(JSON.stringify(out));
