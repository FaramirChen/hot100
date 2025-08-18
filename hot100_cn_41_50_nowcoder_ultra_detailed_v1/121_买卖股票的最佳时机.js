/**
 * 题名：LC121 买卖股票的最佳时机（一次交易）
 * 【输入】一行数组（JSON）prices，prices[i] 为第 i 天价格
 * 【输出】最大利润（整数），若不交易则为 0
 * 【策略】维护历史最低价 minP，与当前价差价；best = max(best, price - minP)；minP = min(minP, price)。
 * 【复杂度】O(n)，O(1)。
 */
const fs=require('fs');
const prices=JSON.parse(fs.readFileSync(0,'utf8').trim());
let minP=Infinity, best=0;
for(const p of prices){ if(p<minP) minP=p; else if(p-minP>best) best=p-minP; }
console.log(String(best));
