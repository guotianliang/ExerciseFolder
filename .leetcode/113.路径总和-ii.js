/*
 * @lc app=leetcode.cn id=113 lang=javascript
 *
 * [113] 路径总和 II
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
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
  let loadList=[]
  function walk(root,sum,path){

    if(!root){
      return 
    }

    let surPlue = sum - root.val

    if(!root.left&&!root.right){
      if(!surPlue){
        path.push(root.val)
        loadList.push(path)
      }
      return 
    }
    walk(root.left,surPlue,[...path,root.val])

    walk(root.right,surPlue,[...path,root.val])

  }
  let path=[]
  walk(root,targetSum,path)


  return loadList
};
// @lc code=end

