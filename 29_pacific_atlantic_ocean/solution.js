/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
  const rowLen = heights.length;
  const colLen = heights[0].length;
  const arr = [];

  const vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  
  // check this node can finally flow to both ocean.
  // 0: failed; 1: pacific; 2: atlantic; 3: success
  const cache = [...new Array(rowLen)].map(_ => new Array(colLen).fill(undefined));
  const vis = [...new Array(rowLen)].map(_ => new Array(colLen).fill(0));

  const dfs = (r, c) => {
      if (cache[r][c] !== undefined) return cache[r][c];
      if (vis[r][c]) return 0;
      
      vis[r][c] = 1;
      const val = heights[r][c];
      let ret = 0;

      if (r === 0 || c === 0) {
          ret |= 1;
      }
      if (r === rowLen - 1 || c === colLen - 1) {
          ret |= 2;
      }

      if (ret !== 3 && r >= 1 && heights[r - 1][c] <= val) {
          ret |= dfs(r - 1, c);
      }
      if (ret !== 3 && c >= 1 && heights[r][c - 1] <= val) {
          ret |= dfs(r, c - 1);
      }
      if (ret !== 3 && r < rowLen - 1 && heights[r + 1][c] <= val) {
          ret |= dfs(r + 1, c);
      }
      if (ret !== 3 && c < colLen - 1 && heights[r][c + 1] <= val) {
          ret |= dfs(r, c + 1);
      }

      vis[r][c] = 0;
      return ret
  }

  for (let i = 0; i < rowLen; i++) {
      for (let j = 0; j < colLen; j++) {
          const res = dfs(i, j);
          cache[i][j] = res;

          if (res === 3) {
              arr.push([i, j]);
          }
      }
  }


  return arr;
};