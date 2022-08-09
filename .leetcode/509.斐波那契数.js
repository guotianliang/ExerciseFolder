/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  if (n == 0 || n == 1) {
    // base case
      return n;
  }
  // 分别代表 dp[i - 1] 和 dp[i - 2]
  let dp_i_1 = 1, dp_i_2 = 0;
  for (let i = 2; i <= n; i++) {
      // dp[i] = dp[i - 1] + dp[i - 2];
      let dp_i = dp_i_1 + dp_i_2;
      dp_i_2 = dp_i_1;
      dp_i_1 = dp_i;
  }
  return dp_i_1;
};
// @lc code=end

