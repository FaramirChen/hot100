/**
 * 题名：LC572 另一棵树的子树
 * 【输入】两行：
 *   第1行：树 root 的层序数组（JSON）
 *   第2行：树 subRoot 的层序数组（JSON）
 * 【输出】true/false，subRoot 是否为 root 的子树
 * 【做法】递归：枚举 root 中每个节点作为候选根，判断与 subRoot 是否完全相同。
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

const lines=fs.readFileSync(0,'utf8').trim().split(/\r?\n/);
const arr1=JSON.parse(lines[0]||'[]'), arr2=JSON.parse(lines[1]||'[]');
const A=buildTreeLevelOrder(arr1), B=buildTreeLevelOrder(arr2);
function same(x,y){
  if(!x && !y) return true;
  if(!x || !y) return false;
  return x.val===y.val && same(x.left,y.left) && same(x.right,y.right);
}
function isSub(a,b){
  if(!b) return true;
  if(!a) return false;
  return same(a,b) || isSub(a.left,b) || isSub(a.right,b);
}
console.log(isSub(A,B)?'true':'false');
