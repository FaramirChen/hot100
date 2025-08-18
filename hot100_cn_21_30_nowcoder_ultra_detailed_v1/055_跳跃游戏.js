/**
 * 题名：LC055 跳跃游戏（贪心）
 * 【输入】一行非负整数数组（JSON），a[i] 表示从 i 最远可跳 a[i] 步
 * 【输出】是否可以到达最后一个下标（true/false）
 * 【策略】维护能达到的“最远位置 far”；扫描到 i 时必须 i <= far 才能继续；更新 far = max(far, i + a[i])。
 */
const fs = require('fs');
const a = JSON.parse(fs.readFileSync(0, 'utf8').trim());
let far = 0;                     // 目前能到达的最远下标
for(let i=0;i<a.length;i++){
  if(i > far){ console.log('false'); process.exit(0); } // 到不了 i，直接失败
  far = Math.max(far, i + a[i]);
}
console.log('true');
