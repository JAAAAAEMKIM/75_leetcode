
var wordBreak = function(s, wordDict) {
  const dp = [];
  const wordMap = {};
  for(let word of wordDict) {
      let cur = wordMap;
      for(let i = 0; i < word.length; i++){
          if (!cur[word[i]]) {
              cur[word[i]] = {};
          }
          cur = cur[word[i]];
      }
      cur['end'] = true;
  }

  const dfs = (idx) => {
      if (idx === s.length) return true;
      if (dp[idx] !== undefined) return dp[idx];

      let cur = wordMap;
      let ret = false;
      while(cur[s[idx]]) {
          cur = cur[s[idx]];
          if (cur['end']) {
              dp[idx + 1] = dfs(idx + 1);
              ret ||= dp[idx + 1];
              if (ret) return true;
          }
          idx += 1;
      }
      return false;
  }

  return dfs(0);
};


