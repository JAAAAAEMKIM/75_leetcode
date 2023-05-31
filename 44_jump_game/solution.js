var canJump = function(nums) {
  let border = 0 + nums[0];
  let newBorder = 0;

  for (let j = 0; j < nums.length; j++) {
      if (j > border) return false;

      newBorder = j + nums[j];

      if (border < newBorder) {
          border = newBorder;
      }
  }
  return true;
};