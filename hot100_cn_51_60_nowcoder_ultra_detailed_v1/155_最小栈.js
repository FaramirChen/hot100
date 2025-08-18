/**
 * 题名：LC155 最小栈（辅助栈/栈内存最小值）
 * 【输入】两行：
 *   第1行：操作数组（JSON），例如 ["MinStack","push","push","getMin","push","getMin","top","pop","getMin"]
 *   第2行：参数数组（JSON），例如 [[],[-2],[0],[],[-3],[],[],[],[]]
 * 【输出】每次操作的返回值数组（构造与 push/pop 返回 null）
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const ops=JSON.parse(lines[0]); const args=JSON.parse(lines[1]);
class MinStack{
  constructor(){ this.st=[]; this.minSt=[]; }
  push(x){ this.st.push(x); if(!this.minSt.length || x<=this.minSt[this.minSt.length-1]) this.minSt.push(x); return null; }
  pop(){ if(!this.st.length) return null; const x=this.st.pop(); if(x===this.minSt[this.minSt.length-1]) this.minSt.pop(); return null; }
  top(){ return this.st.length? this.st[this.st.length-1] : null; }
  getMin(){ return this.minSt.length? this.minSt[this.minSt.length-1] : null; }
}
let stk=null; const out=[];
for(let i=0;i<ops.length;i++){
  const op=ops[i], a=args[i];
  if(op==="MinStack"){ stk=new MinStack(); out.push(null); }
  else if(op==="push"){ out.push(stk.push(a[0])); }
  else if(op==="pop"){ out.push(stk.pop()); }
  else if(op==="top"){ out.push(stk.top()); }
  else if(op==="getMin"){ out.push(stk.getMin()); }
  else out.push(null);
}
console.log(JSON.stringify(out));
