/**
 * 题名：LC538 把二叉搜索树转换为累加树
 * 【输入】一行：BST 的层序数组（JSON）
 * 【输出】转换后的层序数组（JSON）
 * 【方法】反向中序遍历（右->中->左），维护累加和 sum，把节点值更新为“>=该节点的所有值的和”。
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

const arr=JSON.parse(fs.readFileSync(0,'utf8').trim());
const root=buildTreeLevelOrder(arr);
let acc=0;
function revIn(o){
  if(!o) return;
  revIn(o.right);
  acc += o.val;
  o.val = acc;
  revIn(o.left);
}
revIn(root);
console.log(JSON.stringify(treeToLevelOrderArray(root)));
