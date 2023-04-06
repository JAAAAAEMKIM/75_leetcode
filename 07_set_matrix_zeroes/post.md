

matrix에 대해 in-place로 해당 과제를 수행해야한다.

즉 간단히 0을 다 찾고, 찾은 0의 행과 열에 대해서 0으로 만들기를 수행한다.

```ts
 function setZeroes(matrix: number[][]): void {
  const rowVisited = new Map();
  const colVisited = new Map();

  for(let i = 0; i < matrix.length; i++) {
      
      for( let j = 0; j < matrix[0].length; j ++) {

          if (matrix[i][j] === 0) {
              rowVisited.set(i, true)
              colVisited.set(j, true)
          }
      }
  }

  for (let i of rowVisited.keys()) {
      for( let j = 0; j < matrix[0].length; j ++) {
          matrix[i][j] = 0;
      }
  }
  for (let i of colVisited.keys()) {
      for( let j = 0; j < matrix.length; j ++) {
          matrix[j][i] = 0;
      }
  }
};
```