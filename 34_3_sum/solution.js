/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  let result = [];
  
  for (let i = 0; i < nums.length - 2; i++) {
      // Skip duplicate numbers
      if (i > 0 && nums[i] === nums[i-1]) {
          continue;
      }
          
      let l = i+1;
      let r = nums.length - 1;
      while (l < r) {
          const s = nums[i] + nums[l] + nums[r];
          if (s < 0) {
              l += 1;
          } else if (s > 0) {
              r -= 1;
          } else {
              // Found three numbers whose sum is zero
              result.push([nums[i], nums[l], nums[r]]);
              
              // Skip duplicate numbers
              while (l < r && nums[l] === nums[l+1]) {
                  l += 1;
              }
              while (l < r && nums[r] === nums[r-1]) {
                  r -= 1;
              }
              
              l += 1;
              r -= 1;
          }
      }
  }
  
  return result;
}