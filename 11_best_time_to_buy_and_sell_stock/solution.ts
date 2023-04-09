/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let ret = 0;
  let max = 0;

  for(let i = prices.length - 1; i >= 0; i--) {
      prices[i] <= max
          ? ret = Math.max(ret, max - prices[i])
          : max = prices[i]
  }
  return ret;
};