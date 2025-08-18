/**
 * 题名：LC236 二叉树的最近公共祖先（LCA）
 * 【输入】三行：
 *   第1行：层序数组（JSON），如 [3,5,1,6,2,0,8,null,null,7,4]
 *   第2行：p 的值
 *   第3行：q 的值
 * 【输出】最近公共祖先的值（若不存在则输出 null）
 * 【说明】假定值唯一；使用递归：
 *   - 若当前节点为 null 或等于 p/q，返回该节点；
 *   - 分治到左右子树，若左右均非空，当前即 LCA；否则返回非空者。
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
const arr=JSON.parse(lines[0]); const pv=JSON.parse(lines[1]); const qv=JSON.parse(lines[2]);
const root=buildTreeLevelOrder(arr);
function lca(node){
  if(!node) return null;
  if(node.val===pv || node.val===qv) return node;
  const L=lca(node.left), R=lca(node.right);
  if(L && R) return node;
  return L?L:R;
}
const ans=lca(root);
console.log(ans? String(ans.val) : 'null');
