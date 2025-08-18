/**
 * 题名：LC049 字母异位词分组（哈希）
 * 【输入】一行字符串数组（JSON），例如：["eat","tea","tan","ate","nat","bat"]
 * 【输出】分组后的数组（JSON），例如：[["eat","tea","ate"],["tan","nat"],["bat"]]
 * 【方法】
 *   - 方式1：把字符串排序作为键；复杂度 O(Σ L log L)。
 *   - 方式2：26 维频次数组作为键；复杂度 O(Σ L)；实现上需把计数编码为字符串键。
 *   这里采用“排序键”实现，代码更简洁。
 */
const fs = require('fs');
const strs = JSON.parse(fs.readFileSync(0, 'utf8').trim());
const mp = new Map(); // key: 排序后的字符串; value: 分组数组
for(const s of strs){
  const key = s.split('').sort().join(''); // 将字母排序后作为分组key
  if(!mp.has(key)) mp.set(key, []);
  mp.get(key).push(s);
}
console.log(JSON.stringify(Array.from(mp.values())));
