/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  let res = 0;
  const height = grid.length;
  const width = grid[0].length;

  const cache = [...new Array(height)].map(_ => new Array(width).fill(undefined));
  const dr = [1, 0, -1, 0];
  const dc = [0, 1, 0, -1];

  const dfs = (r, c) => {
      cache[r][c] = res;

      for (let i = 0; i < 4; i++) {
          const nr = dr[i] + r;
          const nc = dc[i] + c;

          if (nr < 0 || nc < 0 || nr >= height || nc >= width) continue;
          if (grid[nr][nc] === "0" || cache[nr][nc]) continue;
          dfs(nr, nc);
      }
  }

  for (let i = 0; i < height; i++) {
      for(let j = 0; j < width; j++) {
          if (cache[i][j] !== undefined || grid[i][j] === "0") continue;

          res += 1;
          dfs(i, j);
      }
  }
  return res;
};