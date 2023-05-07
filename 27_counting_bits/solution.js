/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
  const ans = [];

  for(let j = 0; j <= n; j++) {
      let cnt = 0;
      let i = j;

      while (i > 0) {
          const r = i % 2;
          i = r ? (i - 1) / 2 : i / 2;
          cnt += r;
      }

      ans.push(cnt);
  }

  return ans;
};

// 0 1 0 1 0 1 0 1
// 0 0 1 1 0 0 1 1
// 0 0 0 0 1 1 1 1