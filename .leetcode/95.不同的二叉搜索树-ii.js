/*
 * @lc app=leetcode.cn id=95 lang=javascript
 *
 * [95] 不同的二叉搜索树 II
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
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
  if(n===0){
    return []
  }
  const count = function(lo,hi){
    let res =[]
    if (lo > hi) {
        res.push(null);
        return res;
    }
    for(let i=lo;i<=hi;i++){
      const left = count(lo,i-1)
      const right = count(i+1,hi)
    }

  }
};
// @lc code=end

