/**
 * 题名：LC739 每日温度（单调栈）
 * 【输入】一行数组（JSON），温度列表
 * 【输出】数组（JSON），第 i 项表示需要等几天才会升温；若无则为 0
 * 【方法】维护一个“从栈底到栈顶温度递减”的栈，存放下标；遇到更高温度就更新答案并出栈。
 */
const fs=require('fs');
const T=JSON.parse(fs.readFileSync(0,'utf8').trim());
const n=T.length, ans=new Array(n).fill(0), st=[];
for(let i=0;i<n;i++){
  while(st.length && T[i] > T[st[st.length-1]]){
    const j=st.pop();
    ans[j]=i-j;
  }
  st.push(i);
}
console.log(JSON.stringify(ans));
