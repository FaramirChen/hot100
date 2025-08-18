/**
 * 题名：LC114 二叉树展开为链表（原地，前序顺序）
 * 【输入】一行：层序数组（JSON）
 * 【输出】沿着 right 指针形成的“链表”节点值序列（JSON），例如 [1,2,3,4,5,6]
 * 【技巧】Morris/线索化 或 递归/栈；此处用“原地右旋”：
 *   对每个节点：若有左子树，找到其左子树的最右节点（前驱），把当前的右子树接到这个最右节点的 right，
 *   再把当前节点的 left 移到 right，并将 left 置空，继续处理当前节点的 right。
 * 【复杂度】O(n)；原地 O(1) 额外空间（不算递归栈）。
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
let root=buildTreeLevelOrder(arr);
let cur=root;
while(cur){
  if(cur.left){
    // 找到左子树的最右节点
    let pre=cur.left;
    while(pre.right) pre=pre.right;
    // 将原右子树挂到 pre.right
    pre.right = cur.right;
    // 左子树挪到右边，并清空左指针
    cur.right = cur.left;
    cur.left = null;
  }
  cur = cur.right;
}
// 输出沿 right 的序列
const out=[]; cur=root; while(cur){ out.push(cur.val); cur=cur.right; }
console.log(JSON.stringify(out));
