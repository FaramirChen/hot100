/**
 * 题名：LC104 二叉树的最大深度（DFS）
 * 【输入】一行：二叉树的层序数组（JSON），例如：[3,9,20,null,null,15,7]
 * 【输出】一个整数：最大深度（根节点深度为 1）
 * 【思路】深度 = 1 + max(左子树深度, 右子树深度)，空树深度为 0。
 * 【复杂度】O(n) 访问每个节点一次；递归栈 O(h)。
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
function depth(node){
  if(!node) return 0;
  const l=depth(node.left), r=depth(node.right);
  return 1 + (l>r?l:r);
}
console.log(String(depth(root)));
