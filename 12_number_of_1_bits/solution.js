/**
 * @param {number} n - a positive integer
 * @return {number}
 */
const hammingWeight = function(n) {
  let ret = 0;

  while (n >= 1) {
    if (n % 2) {
      ret += 1;
      n -= 1; 
    }

    n = n >>> 1;
  }

  return ret;
};