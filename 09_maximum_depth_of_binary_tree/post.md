Tree의 기초 격 문제이다.  BFS와 DFS 두 가지 방법으로 구현해보았다.
recursion을 이용한 DFS가 역시 훨씬 쉽고 간결하다.
빠르기도 훨씬 빠르다.

1. BFS

```ts
function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;

    const q = [{node: root, depth: 1}];
    let head = 0;
    let res = 0;

    while (head < q.length) {
        const {node, depth} = q[head];
        res = depth;
        node.left && q.push({node: node.left, depth: depth + 1});
        node.right && q.push({node: node.right, depth: depth + 1});
        head ++;
    }

    return res;
};
```

2. DFS

```ts
function maxDepth(root: TreeNode | null): number {
    return root ? Math.max(maxDepth(root.left), maxDepth(root.right)) + 1 : 0;
};
```
