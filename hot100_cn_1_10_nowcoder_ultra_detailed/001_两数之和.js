/**
 * 题名：LC001 两数之和（哈希表，一遍扫描）
 * 机考说明：
 *   - 输入：第1行为数组（JSON），如：[2,7,11,15]；第2行为目标值target（整数）
 *   - 输出：两个下标（0开始，空格分隔，按升序输出）
 * 设计要点：
 *   1) 一边扫描nums，一边把“值->下标”存入哈希表。
 *   2) 在访问 nums[i] 之前，先查询 need = target - nums[i] 是否已出现；若是，直接返回答案。
 *      —— 这样可避免“用同一元素两次”的错误（因为need的下标必然 < i）。
 *   3) 为了更稳定的下标选择，通常记录“首次出现的下标”。
 * 复杂度：时间 O(n)，空间 O(n)；n 为数组长度。
 */
const fs = require('fs');
// 读取所有标准输入，并按行拆分；兼容 Windows 的 \r\n 换行
const lines = fs.readFileSync(0, 'utf8').trim().split(/\r?\n/);
// 第1行：数组（JSON 格式）；第2行：整数 target
const nums = JSON.parse(lines[0]);
const target = parseInt(lines[1], 10);

// mp: Map<number, number>，记录“值 -> 最早出现的下标”
const mp = new Map();

for (let i = 0; i < nums.length; i++) {
  // 对当前值 x，想找另一个 need 使 x + need = target
  const x = nums[i];
  const need = target - x;

  // 如果 need 已在哈希表中，说明之前某个位置 j 的值 + 当前值 = target
  if (mp.has(need)) {
    const j = mp.get(need);
    // 输出时按升序要求打印（习惯性保证）
    if (j < i) console.log(`${j} ${i}`);
    else console.log(`${i} ${j}`);
    // 题目通常保证有解，因此可以直接退出
    process.exit(0);
  }

  // 若当前值还没被记录过，则记录它的下标为首次出现的位置
  if (!mp.has(x)) mp.set(x, i);
}

// 若题目不保证有解，可在此输出 -1 -1 或空行
console.log('');
