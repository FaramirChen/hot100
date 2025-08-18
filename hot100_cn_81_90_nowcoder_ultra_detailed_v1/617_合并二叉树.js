/**
 * 题名：LC617 合并二叉树
 * 【输入】两行：
 *   第1行：树1 层序数组（JSON）
 *   第2行：树2 层序数组（JSON）
 * 【输出】合并后树的层序数组（JSON）
 * 【规则】重叠节点值相加；若某一侧为空则取另一侧。
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
const arr1=JSON.parse(lines[0]||'[]');
const arr2=JSON.parse(lines[1]||'[]');
const t1=buildTreeLevelOrder(arr1);
const t2=buildTreeLevelOrder(arr2);
function merge(a,b){
  if(!a) return b;
  if(!b) return a;
  const node={ val: a.val + b.val, left: null, right: null };
  node.left = merge(a.left, b.left);
  node.right = merge(a.right, b.right);
  return node;
}
const root=merge(t1,t2);
console.log(JSON.stringify(treeToLevelOrderArray(root)));
