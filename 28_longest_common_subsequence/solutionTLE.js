var longestCommonSubsequence = function(text1, text2) {
  const lcs = (text1, text2) => {
      let max = 0;

      for(let i = 0; i < text1.length; i++) {
          const char = text1[i];
          const idx = text2.indexOf(char);
          if (idx === -1) continue;

          max = Math.max(max, lcs(text1.slice(i + 1), text2.slice(idx + 1)) + 1);
      }

      return max;
  }

  return lcs(text1, text2);
};