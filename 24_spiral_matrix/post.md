2차원 매트릭스가 주어졌을 때 오른쪽, 아래, 왼쪽, 위 순서로 회전하면서 매트릭스를 순회하여 result에 담아야한다.

1) 방향 벡터를 두고 방향벡터로 다음 노드의 인덱스를 구함
2) 해당 노드가 조건 밖이면 다음 방향벡터로 변경하여 다시 구함
3) 모든 개수에 대해 시행될 때까지 반복
4) 이 때, visited를 통해 이미 방문한 곳을 만나면 회전하도록 설정

```ts
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const VISITED = -101;

var spiralOrder = function(matrix) {
    const result = [];
    let height = matrix.length;
    let width = matrix[0].length;
    let maxCount = height * width;
    let cnt = 0;

    const pos = [0, 0];
    const vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    let vectorIdx = 0;

    while (cnt < maxCount) {
        result.push(matrix[pos[0]][pos[1]])
        matrix[pos[0]][pos[1]] = VISITED;
        let nextRow = pos[0] + vectors[vectorIdx][0];
        let nextCol = pos[1] + vectors[vectorIdx][1];

        if (nextRow >= height || nextCol >= width || nextRow < 0 || nextCol < 0 || matrix[nextRow][nextCol] === VISITED) {
            vectorIdx = (vectorIdx + 1) % 4;
            nextRow = pos[0] + vectors[vectorIdx][0];
            nextCol = pos[1] + vectors[vectorIdx][1];
        }

        pos[0] = nextRow;
        pos[1] = nextCol;
        cnt += 1;
    }

    return result
};
```

pos를 하나하나 밟아가는 방식이다. 개선을 한다면, 한 방향에 대해 끝까지 쭉 한 번에 처리하는게 조금 더 빠르지 않을까해서 살짝 수정했다.
열의 변화만 보면 3 -> -2 -> 1 순으로 진행되고
행도 마찬가지로 2 -> -1로 진행되는 것을 알 수 있다.
이를 활용해서 counts배열을 만들고, 필요한 개수만큼 for문을 통해 바로 result로 넣을 수 있게 해줬다.

```ts

var spiralOrder = function(matrix) {
    const result = [];
    let height = matrix.length;
    let width = matrix[0].length;
    let maxCount = height * width;
    let cnt = 0;

    const pos = [0, -1];
    const vectors = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const counts = [width, height - 1];
    let vectorIdx = 0;

    while (cnt < maxCount) {
        const countIdx = vectorIdx % 2;
        const vectorRow = vectors[vectorIdx][0];
        const vectorCol = vectors[vectorIdx][1];

        for (let i = 0; i < counts[countIdx]; i++) {
            pos[0] += vectorRow;
            pos[1] += vectorCol;

            result.push(matrix[pos[0]][pos[1]]);
            cnt += 1;
        }
        
        counts[countIdx] -= 1;
        vectorIdx = (vectorIdx + 1) % 4;
    }

    return result
};
```