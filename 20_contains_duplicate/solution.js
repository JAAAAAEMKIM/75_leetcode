var containsDuplicate = function(nums) {
  const cache = new Map();

  for (let num of nums) {
      if (cache.get(num)) return true;

      cache.set(num, true);
  }

  return false;
};
