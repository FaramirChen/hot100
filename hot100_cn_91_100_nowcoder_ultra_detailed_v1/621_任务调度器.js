/**
 * 题名：LC621 任务调度器（贪心公式）
 * 【输入】两行：
 *   第1行：任务数组（JSON），如 ["A","A","A","B","B","B"]
 *   第2行：冷却时间 n（整数）
 * 【输出】完成所有任务的最少时间（单位时间为 1）
 * 【公式】令 maxCnt 为出现次数最多的任务频次，hasMax 为拥有该频次的任务个数；
 *   最少时间 = max( tasks.length, (maxCnt-1)*(n+1) + hasMax )。
 */
const fs=require('fs');
const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const tasks=JSON.parse(lines[0]||'[]'); const n=parseInt(lines[1]||'0',10);
const cnt=new Map(); for(const t of tasks) cnt.set(t,(cnt.get(t)||0)+1);
let maxCnt=0; for(const v of cnt.values()) if(v>maxCnt) maxCnt=v;
let hasMax=0; for(const v of cnt.values()) if(v===maxCnt) hasMax++;
const part = (maxCnt-1)*(n+1)+hasMax;
const ans = Math.max(tasks.length, part);
console.log(String(ans));
