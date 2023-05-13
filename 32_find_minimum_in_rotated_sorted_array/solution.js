var findMin = function(nums) {
  let l = 0, r = nums.length;

  if (nums[0] < nums[nums.length - 1]) return nums[0];

  while (l < r) {
      const mid = Math.floor((l + r) / 2);

      if (nums[0] <= nums[mid]) {
          l = mid + 1;
      } 
      if (nums[0] > nums[mid]) {
          r = mid;
      }
  }

  return nums[r] ?? nums[0]
};