var coinChange = function(coins, amount) {
  const cache = new Map();

  coins.sort((a, b) => b - a);

  for (let coin of coins) {
      cache.set(coin, 1);
  }

  return dfs(coins, amount, 0, cache);
};

const dfs = (coins, amount, idx, cache) => {
  if (cache.get(amount)) return cache.get(amount);
  if (amount  < 0) return -1;
  if (amount  === 0) return 0;

  let minCount = -1;

  for(let i = 0; i < coins.length; i++) {
      const res = dfs(coins, amount - coins[i], i, cache);

      if (res >= 0) {
          minCount = minCount >= 0 ? Math.min(minCount, res + 1) : res + 1;
      }
  }
  cache.set(amount, minCount);
  return minCount;
}
