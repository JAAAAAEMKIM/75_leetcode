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