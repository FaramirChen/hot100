/**
 * 题名：LC124 二叉树中的最大路径和
 * 【输入】一行：层序数组（JSON），可含负数
 * 【输出】最大路径和（整数）
 * 【定义】路径可从任意节点到任意节点（必须连续），可穿过某个“拐点”节点。
 * 【转移】对每个节点，向上返回“可延伸的一条边的最大贡献” = max(0, 左贡献, 右贡献) + val；
 *         同时用全局变量更新“以此节点作拐点的最好路径”= val + max(0,左贡献) + max(0,右贡献)。
 */
const fs=require('fs');

// ===== 二叉树辅助（层序数组 <-> 指针结构；null 表示空指针） =====
// 输入数组格式示例：[3,9,20,null,null,15,7]
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

const arr=JSON.parse(fs.readFileSync(0,'utf8').trim());
const root=buildTreeLevelOrder(arr);
let best = -Infinity;
function gain(node){
  if(!node) return 0;
  const L = Math.max(0, gain(node.left));
  const R = Math.max(0, gain(node.right));
  best = Math.max(best, node.val + L + R);
  return node.val + Math.max(L, R);
}
gain(root);
console.log(String(best));
