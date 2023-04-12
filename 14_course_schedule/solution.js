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