/**
 * 题名：LC543 二叉树的直径
 * 【输入】一行：层序数组（JSON），如 [1,2,3,4,5]
 * 【输出】树的直径（整数，按边数计）
 * 【思路】DFS 返回每个节点的“最大向下深度”；同时用全局变量记录
 *        过该节点的最长路径 = 左深度 + 右深度，取所有节点的最大值。
 * 【复杂度】O(n) 时间；递归栈 O(h)。
 */
const fs=require('fs');

// ===== 二叉树辅助（层序数组 <-> 指针结构；null 表示空指针） =====
// 输入数组格式示例：[1,2,3,4,5]
function buildTreeLevelOrder(arr) {
  if (!arr || arr.length === 0 || arr[0] === null) return null;
  const root = { val: arr[0], left: null, right: null };
  const q = [root];
  let i = 1;
  while (i < arr.length && q.length) {
    const node = q.shift();
    if (!node) continue;
    if (i < arr.length) {
      const lv = arr[i++];
      if (lv !== null && lv !== undefined) {
        node.left = { val: lv, left: null, right: null };
        q.push(node.left);
      } else q.push(null);
    }
    if (i < arr.length) {
      const rv = arr[i++];
      if (rv !== null && rv !== undefined) {
        node.right = { val: rv, left: null, right: null };
        q.push(node.right);
      } else q.push(null);
    }
  }
  return root;
}

const arr=JSON.parse(fs.readFileSync(0,'utf8').trim());
const root=buildTreeLevelOrder(arr);
let best=0;
function depth(u){
  if(!u) return 0;
  const L=depth(u.left), R=depth(u.right);
  if(L+R>best) best=L+R;
  return Math.max(L,R)+1;
}
depth(root);
console.log(String(best));
