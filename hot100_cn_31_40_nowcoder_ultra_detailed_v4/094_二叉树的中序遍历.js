/**
 * 题名：LC094 二叉树的中序遍历（迭代）
 * 【输入】层序数组（JSON），null 表示空
 * 【输出】中序结果数组（JSON）
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
    // 左孩子
    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        q.push(node.left);
      }
    }
    // 右孩子
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        q.push(node.right);
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
const res=[]; const st=[]; let cur=root;
while(cur||st.length){
  while(cur){ st.push(cur); cur=cur.left; }
  cur=st.pop(); res.push(cur.val);
  cur=cur.right;
}
console.log(JSON.stringify(res));
