var rob = function(nums) {
  if (nums.length === 1 || nums.length === 2) return Math.max(...nums);

  const fn = (nums) => {
      let pprev = 0;
      let prev = nums[0];
      let cur = 0;

      for(let i = 1; i < nums.length; i++ ) {
          cur = Math.max(pprev + nums[i], prev);

          pprev = prev;
          prev = cur;
      }
      return cur;
  }

  return Math.max(fn(nums.slice(1)), fn(nums.slice(0, nums.length - 1)));
};