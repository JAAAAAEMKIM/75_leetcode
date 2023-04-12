directed graph에서 사이클이 생기는 지 판별하는 문제이다.

dfs를 통해, 그래프의 모든 경로에 cycle이 없는지 판단해준다.

cycle의 여부는 경로 탐색 중 이미 방문했던 경로가 다시 나오면 cycle이 있다고 판별할 수 있다.
dfs에 route인자를 받도록 하여, 현재 지나온 경로를 알 수 있다.

성능 개선 1) dfs로 한 노드로부터 시작하는 모든 경로를 탐색했는데 cycle이 없다면, 앞으로 해당 경로에 속한 노드들은 탐색하지 않아도 cycle이 없음을 알 수 있다.
성능 개선 2) cycle이 단 하나라도 있으면 모든 실행을 종료해도된다.

1)은 cache를 두어 연결된 경로들이 모두 true인 경우 cache에 현재 노드를 true로 넣어줬다.
2)는 done을 통해 cycle이 이미 발견되었음을 알 수 있도록 했다.

풀이)

```js
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    let done = false;
    const cache = new Map();
    const nodes = new Map();

    const dfs = (idx, route) => {
        if (done) return false;
        if (cache.get(idx)) return true;
        if (route.get(idx)) return false;
        if (nodes.get(idx).length === 0) return true;

        for (let pre of nodes.get(idx)) {
            route.set(idx, true);
            if (!dfs(pre, route)) {
                done = true;
                return false
            };
            route.delete(idx);
        }

        cache.set(idx, true);
        return true;
    }
    
    for(let i = 0; i < numCourses; i ++){
        nodes.set(i, []);
    }
    for(let i = 0; i < prerequisites.length; i ++){
        const [cur, pre] = prerequisites[i];
        nodes.get(cur).push(pre);
    }

    for (let i = 0; i < numCourses; i++) {
        const route = new Map();
        const res = dfs(i, route);

        if (!res) return false;
    }
    return true;
};
```

시간 복잡도: O(V + E);