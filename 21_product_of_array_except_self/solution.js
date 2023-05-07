
var productExceptSelf = function(nums) {
  let zeroCount = 0;
  let allProduct = 1;

  for (let i = 0; i < nums.length; i++) {
      if (!nums[i]) {
          zeroCount += 1;
          continue;
      }
      allProduct *= nums[i];
  }

  if (zeroCount > 1) return nums.fill(0);

  for (let i = 0; i < nums.length; i++) {
      if (!nums[i]) {
          nums[i] = allProduct;
          continue;
      }

      nums[i] = zeroCount ? 0 : allProduct / nums[i];
  }

  return nums;
};