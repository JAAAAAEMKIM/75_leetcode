function lengthOfLongestSubstring(s: string): number {
  if(s.length === 0) return 0;
  if(s.length === 1) return 1;
  
  let max = 0;
  let start = 0;
  let iter = 1;
  const cache = {};

  while (iter < s.length) {
    cache[s[start]] = start;

    while(iter < s.length) {
      const char = s[iter];
      if (char in cache && cache[char] >= start) {
        max = Math.max(max, iter - start);
        start = cache[char] + 1;
        cache[char] = iter;
        iter++;
        break;
      } else {
        cache[char] = iter;
        iter++;
      }
    }
  }
  return Math.max(max, iter - start);
};