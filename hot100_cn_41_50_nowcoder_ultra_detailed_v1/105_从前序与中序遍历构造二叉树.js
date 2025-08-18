/**
 * 题名：LC105 从前序与中序遍历构造二叉树
 * 【输入】两行：
 *   第1行：前序数组（JSON），例如：[3,9,20,15,7]
 *   第2行：中序数组（JSON），例如：[9,3,15,20,7]
 * 【输出】构造出的二叉树的层序数组（JSON），用于直观检验
 * 【要点】前序第一个是根；在中序中定位根的下标 k，左子树大小为 k-L；递归划分两边区间。
 * 【复杂度】O(n) + 哈希表建索引 O(n)；栈深 O(h)。
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

const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const preorder=JSON.parse(lines[0]); const inorder=JSON.parse(lines[1]);
const idx=new Map(); for(let i=0;i<inorder.length;i++) idx.set(inorder[i], i);
let preIdx=0;
function build(inL, inR){
  if(inL>inR) return null;
  const rootVal = preorder[preIdx++];
  const k = idx.get(rootVal);
  const node = { val: rootVal, left: null, right: null };
  node.left = build(inL, k-1);
  node.right = build(k+1, inR);
  return node;
}
const root=build(0, inorder.length-1);
console.log(JSON.stringify(treeToLevelOrderArray(root)));
