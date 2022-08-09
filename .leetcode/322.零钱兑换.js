/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
  let coinsLen= coins.length
  if (amount == 0) return 0;
  if (amount < 0) return -1;
  // 查备忘录，防止重复计算
  if (memo[amount] != -666)
      return memo[amount];

  let res = Infinity;
  for(let i=0;i<coinsLen;i++){
    let subProblem = dp(coins, amount - coins[i]);
    // 子问题无解则跳过
    if (subProblem == -1) continue;
    // 在子问题中选择最优解，然后加一
    res = Math.min(res, subProblem + 1);
  }
  memo[amount] = (res == Infinity) ? -1 : res;
  return memo[amount];
};
// @lc code=end

