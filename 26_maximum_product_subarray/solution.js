
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  const dpMin = [nums[0]];
  const dpMax = [nums[0]];

  nums.forEach((num, i) => {
      if (i === 0) return;

      const minProduct = dpMin[i - 1] * num;
      const maxProduct = dpMax[i - 1] * num;

      dpMin.push(Math.min(num, minProduct, maxProduct));
      dpMax.push(Math.max(num, minProduct, maxProduct));
  })

  return Math.max(...dpMax)
};