var search = function(nums, target) {
  let l = 0, r = nums.length;
  let leftBound = 0;
  let ans = -1;
  let mid = 0;

  const isRotated = nums[0] > nums[nums.length - 1];

  if (isRotated) {

      while (l < r) {
          mid = Math.floor((l + r) / 2);

          if (nums[mid] === target) return mid;

          if (nums[mid] > nums[nums.length - 1]) {
              l = mid + 1;
          } else {
              r = mid;
          }
      }
      leftBound = l;

      if (target >= nums[0]) {
          l = 0;
          r = leftBound;
      } else {
          l = leftBound;
          r = nums.length;
      }

  }

  while (l < r) {
      mid = Math.floor((l + r) / 2);

      if (nums[mid] < target) {
          l = mid + 1;
      } else {
          r = mid;
      }
  }

  if (nums[l] === target) ans = l;

  return ans;
};