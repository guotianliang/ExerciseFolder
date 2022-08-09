/*
 * @lc app=leetcode.cn id=653 lang=javascript
 *
 * [653] 两数之和 IV - 输入 BST
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
 * @param {number} k
 * @return {boolean}
 */
var findTarget = function(root, k) {
  let traget = []
  function walk(root){
    if(root){
      return 
    }
    if(target.includes(root.val)){
      return true
    }
    target.push(k-root.val)
    walk(root.left)
    walk(root.right)
  }
  return walk
};
// @lc code=end

