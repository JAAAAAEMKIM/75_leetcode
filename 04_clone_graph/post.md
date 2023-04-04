풀이 1.

입력받은 노드를 통해 연결된 노드들의 정보들도 모두 복사해야한다.

제일 먼저 생각나는것은 1. 재귀를 통해 돌면 되겠다라는 것 2. 그래프이기 때문에 무한루프를 조심해야겠다라는 것이다.

그래서 우선 재귀함수를 만들었다.

cloneNode 함수는 노드를 받아 해당 node의 값을 복사한 new Node를 만든다.
node.neighbors를 순회한 결과노드들(복사된 결과들)을 1에서 만든 새 노드에 넣어준다.
재귀함수는 visited를 통해 같은 곳을 또 가는 것을 방지한다.

```ts
const cloneNode = (node: Node, visited: Record<number, Node>): Node => {
    if (!visited[node.val]) {
        visited[node.val] = new Node(node.val);
        visited[node.val].neighbors = node.neighbors.map(node => cloneNode(node, visited));
    }

    return visited[node.val];
}

function cloneGraph(node: Node | null): Node | null {
    if (!node) {
        return null;
    }

    const visited = {};

    return cloneNode(node, visited);
};
```

처음할 때 new Node(node.val, cloneNode(node.neighbors.map(node => cloneNode(node, visited)) 라고 작성해서 틀려버렸다. visited가 만들어지지 않은채로 다음 cloneNode로 들어가기 때문이다.

value 복사, neighbors cloneNode, neighbors 복사 세 과정이 순차적으로 일어나야한다.


다른 사람들의 풀이를 보니, 나처럼 DFS를 하거나, 큐를 이용하여 BFS를 하는 등 방식은 비슷했다.

몇 가지 차이점은
1) visited 체크를 일반 객체가 아닌 Map을 활용해준다거나 하여 성능을 높여주고 있었다.
2) for of 문을 활용했다.

1)은 insert/delete가 많지 않을 경우 Map이 객체보다 조금 더 성능이 좋을 수 있다고 한다.
2)는 벤치마크를 찾아보면 for ... of가 forEach보다 느리다고 하는데, 여기서 해보면 더 빠르게 나온다. 해당 문제의 TC가 for... of에 유리하도록 조금 편향적일 가능성도 있다. 추가 조사가 필요할 것 같다.