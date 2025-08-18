/**
 * 题名：LC437 路径总和 III（前缀和 + DFS）
 * 【输入】两行：
 *   第1行：二叉树层序数组（JSON），如 [10,5,-3,3,2,null,11,3,-2,null,1]
 *   第2行：targetSum（整数）
 * 【输出】路径数量（任意节点出发、向下的连续路径）
 * 【思路】前缀和哈希表：pre 表示从根到当前的路径和；
 *        对于当前和 cur，需要数量 += map[cur - target]；根的前缀和 0 记为 1。
 */
const fs=require('fs');

// ===== 二叉树辅助（层序数组 <-> 指针结构；null 表示空指针） =====
// 输入数组格式示例：[3,5,1,6,2,0,8,null,null,7,4]
function buildTreeLevelOrder(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const q = [root];
  let i = 1;
  while (i < arr.length && q.length) {
    const node = q.shift();
    if (!node) continue;
    // 左孩子
    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        q.push(node.left);
      } else {
        q.push(null);
      }
    }
    // 右孩子
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        q.push(node.right);
      } else {
        q.push(null);
      }
    }
  }
  return root;
}
function treeToLevelOrderArray(root) {
  if (!root) return [];
  const res = [];
  const q = [root];
  while (q.length) {
    const node = q.shift();
    if (node) {
      res.push(node.val);
      q.push(node.left);
      q.push(node.right);
    } else {
      res.push(null);
    }
  }
  while (res.length && res[res.length - 1] === null) res.pop();
  return res;
}

const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const arr=JSON.parse(lines[0]); const target=parseInt(lines[1],10);
const root=buildTreeLevelOrder(arr);
let ans=0;
const cnt=new Map(); cnt.set(0,1); // 空路径前缀和
function dfs(node, pre){
  if(!node) return;
  const cur = pre + node.val;
  ans += (cnt.get(cur - target) || 0);
  cnt.set(cur, (cnt.get(cur)||0)+1);
  dfs(node.left, cur);
  dfs(node.right, cur);
  cnt.set(cur, cnt.get(cur)-1); // 回溯
}
dfs(root, 0);
console.log(String(ans));
