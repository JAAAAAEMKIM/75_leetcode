
var missingNumber = function(nums) {
  return nums.reduce((acc, cur, idx) => acc = acc + idx + 1 - cur, 0);
};