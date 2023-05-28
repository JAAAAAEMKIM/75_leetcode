var combinationSum4 = function(nums, target) {
  const dp = [...Array(target + 1)].fill(0);
  dp[0] = 1;
  nums.sort((a, b) => Number(a) - Number(b));
  
  for (let i = 1; i <= target; i++) {
      for(let j = 0; i - nums[j] >= 0; j++) {
          dp[i] += dp[i - nums[j]];
      }
  }

  return dp[target];
};