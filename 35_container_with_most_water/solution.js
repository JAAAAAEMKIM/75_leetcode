var maxArea = function(height) {
  let max = 0;
  let l= 0, r = height.length - 1;

  while (l < r) {
    max = Math.max(max, (r - l) * Math.min(height[l], height[r]));

    if (height[l] > height[r]) {
        r -= 1;
    } else {
        l += 1;
    } 
  }
  return max;
};