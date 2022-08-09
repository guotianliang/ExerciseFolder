/*
 * @lc app=leetcode.cn id=437 lang=javascript
 *
 * [437] 路径总和 III
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
 * @return {number}
 */
var pathSum = function(root, targetSum) {
  let pathNum=0
  function walk(root,targetSum){
    if(!root){
      return
    }
    let surplue = targetSum-root.val
    console.log(targetSum,root.val)
    if(!surplue){
      pathNum++
    }
    walk(root.left,surplue)
    walk(root.right,surplue)
  }
  walk(root, targetSum)
  return pathNum
};
// @lc code=end

