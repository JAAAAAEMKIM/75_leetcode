var maxSubArray = function(nums) {
  const sums = new Array(nums.length + 1);
  let max = -Infinity;
  sums[0] = 0;
  for (let i = 1; i < nums.length + 1; i++) {
      sums[i] = sums[i - 1] + nums[i - 1];
  }

  for (let i = 1, j = 0; i < sums.length; i++) {
      max = Math.max(sums[i] - sums[j], max);
      if (sums[i] < sums[j]) {
          j = i;
      }
  }

  return max;
};