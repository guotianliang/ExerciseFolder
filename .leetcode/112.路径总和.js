/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
  
  let falg=false;
  let traverse = function (root,targetSum){
    if(!root){
      return false
    }
    let sum = targetSum - root.val
    if(!root.left&&!root.right&&sum===0){
      falg=true 
    }
    traverse(root.left,sum)
    traverse(root.right,sum)
  }
  traverse(root, targetSum)
  return falg
};
// @lc code=end

