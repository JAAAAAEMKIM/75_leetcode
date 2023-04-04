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
2)는 벤치마크를 찾아보면 for ... of가 forEach보다 느리다고 하는데, 여기서 해보면 더 빠르게 나온다.
해당 문제의 TC가 for... of에 유리하도록 조금 편향적일 가능성도 있다.

직접 테스트를 돌려 보았다.

for, for ... of, forEach에 대하여

length 500의 Array 순회에 소요된 시간에 대한 100회 실행 평균을 구한다

```ts
const { performance } = require("perf_hooks");

const testObj = [...Array(500)].reduce((acc, __, i) => {acc[i] = i; return acc;}, {});
const keys = Object.keys(testObj);

let avg = 0;


[...Array(100)].forEach(() => {
  const start = performance.now();
  [...Array(500)].forEach(() => {
    let res = 0;
  
    // 1) for
    for(let i = 0; i < 500; i++) {
      res += testObj[i];
    }
    
    // 2) for ... of
    for(let i of keys) {
      res += testObj[i];
    }
    
    // 3) forEach
    keys.forEach(key => {
      res += testObj[key];
    });
  })
  const t = performance.now() - start;

  avg += t;
})

console.log(avg / 100);
```


각각 실행 결과는, 1) 0.34ms 2) 1.75ms 3) 2.27ms 로 확연했다.

순회하는 크기가 큰 경우에는 forEach가 더 빠른 경우도 있다. 앞서 살펴봤던 벤치마크의 경우에 50000개의 array 였다.
반면 작은 경우에는 이렇게 for 가 압도적으로 빠르고 그 뒤로 for ... of가 이어진다.

이번 문제의 경우 neighbor의 개수가 최대 100개이기 때문에 for ... of에서 더 좋은 결과가 나오지 않았나 생각한다.