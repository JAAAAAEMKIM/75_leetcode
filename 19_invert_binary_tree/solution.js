var invertTree = function(root) {
  const invert = (node) => {
      if (!node) return null;

      return {
          val: node.val,
          left:invert(node.right),
          right: invert(node.left)
      }
  }

  return invert(root);
};