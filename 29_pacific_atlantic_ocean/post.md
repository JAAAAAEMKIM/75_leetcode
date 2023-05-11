모든 점에 대해 DFS를 통해서 Atlantic과 Pacific 모두에 닿을 수 있는지 확인해준다.

캐싱을 통해 연산을 줄일 수 있다.
DFS 진행 중, 이미 결과가 나온 점을 다시 지나는 경우가 있다.
이 때, 그 점이 Atlantic/Pacific에 닿는지 안닿는지를 알고 있으므로 캐싱된 값을 이용해준다.

vis는 이번 DFS에서 중복 방문을 막기 위해 설정한 값이다.

```ts
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
```

solution을 찾아보니 더 효율적인 풀이가 있다.
모든 점에 대해 DFS를 시행하는 대신에, Atlantic/Pacific에 대해 인접한 노드들에서부터 시작해 닿을 수 있는 노드들을 체크하는 것이다.
이 둘이 겹치는 경우 우리가 원하는 답이된다.

```ts
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    if (!heights.length) return heights

    const PACIFIC_OCEAN_VALUE = 1;
    const ATLANTIC_OCEAN_VALUE = 2;

    let y = heights.length, 
        x = heights[0].length, 
        ans = [],
        dp = new Uint8Array(x * y);

    const dfs = (length, width, ocean, originHeight) => {
        let position = length * x + width;

        const isFlowedToThisOcean = dp[position] & ocean;
        const isLowerThanOriginHeight = heights[length][width] < originHeight;
        if (isFlowedToThisOcean || isLowerThanOriginHeight) return;

        dp[position] += ocean, originHeight = heights[length][width];
        if (dp[position] === PACIFIC_OCEAN_VALUE + ATLANTIC_OCEAN_VALUE) ans.push([length,width]);

        // calculate down
        if (length + 1 < y) dfs(length+1, width, ocean, originHeight);

        // calculate up
        if (length > 0) dfs(length-1, width, ocean, originHeight);

        // calculate right
        if (width + 1 < x) dfs(length, width+1, ocean, originHeight);

        // calculate left
        if (width > 0) dfs(length, width-1, ocean, originHeight);
    }   

    for (let length = 0; length < y; length++) {
        dfs(length, 0, PACIFIC_OCEAN_VALUE, heights[length][0]);
        dfs(length, x-1, ATLANTIC_OCEAN_VALUE, heights[length][x-1]);
    }

    for (let width = 0; width < x; width++) {
        dfs(0, width, PACIFIC_OCEAN_VALUE, heights[0][width]);
        dfs(y-1, width, ATLANTIC_OCEAN_VALUE, heights[y-1][width]);
    }

    return ans
};
```