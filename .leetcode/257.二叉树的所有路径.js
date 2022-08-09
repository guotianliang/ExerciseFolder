/*
 * @lc app=leetcode.cn id=257 lang=javascript
 *
 * [257] 二叉树的所有路径
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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  let result=[]
  function walk(root,val=[]){
    if(!root){
      reutrn
    }
    if(root.left===null&&root.right===null){
      result.push(val)
    }
    walk(root.left,[...val,root.val])
    walk(root.right,[...val,root.val])
  }
  walk(root)
  return result
};
// @lc code=end

