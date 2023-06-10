var longestConsecutive = function(nums) {
  if (!nums.length) return 0;

  const mins = new Map();
  const maxs = new Map();
  let num = 0, l = 0, r = 0, max = 1;
  let leftGroup = undefined, rightGroup = undefined;

  for (let i = 0; i < nums.length; i++) {
      num = nums[i];
      l = num - 1;
      r = num + 1;

      if (maxs.get(num) || mins.get(num)) continue;

      leftGroup = maxs.get(l);
      rightGroup = mins.get(r);

      if (!rightGroup && !leftGroup) {
          const newGroup = {
              min: num,
              max: num,
          };
          mins.set(num, newGroup);
          maxs.set(num, newGroup);
      }

      else if (rightGroup && !leftGroup) {
          rightGroup.min = num;
          mins.set(num, rightGroup);
          mins.delete(r);

          max = Math.max(max, rightGroup.max - rightGroup.min + 1);
      }

      else if (!rightGroup && leftGroup) { 
          leftGroup.max = num;
          maxs.set(num, leftGroup);
          maxs.delete(l);

          max = Math.max(max, leftGroup.max - leftGroup.min + 1);
      }

      else {
          const newGroup = {
              min: leftGroup.min,
              max: rightGroup.max,
          }
          mins.set(newGroup.min, newGroup);
          maxs.set(newGroup.max, newGroup);

          mins.delete(r);
          maxs.delete(l);

          max = Math.max(max, newGroup.max - newGroup.min + 1);
      }
  }

  return max;
};